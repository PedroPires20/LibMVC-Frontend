import { Component, EventEmitter, Input, Output, OnInit, OnChanges, SimpleChanges, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BookService } from 'src/services/book.service';
import { LoanFieldsService } from 'src/services/loan-fields.service';
import { LoansService } from 'src/services/loans.service';

interface LoanFormModel {
  reader: string,
  phone: string,
  bookId: string,
  startDate: string,
  duration: number | "",
  renew: boolean
}

interface SaveStatus {
  variant: "error" | "load",
  heading: string,
  message: string,
  buttons?: string[],
  summary?: string,
  details?: string
}

const BOOKS_LOADING_MESSAGE = "Carregando...";
const LOAD_ERROR_MESSAGE = "Ocorreu um erro ao carregar os livros disponíveis";


@Component({
  selector: 'app-loan-dialog',
  templateUrl: './loan-dialog.component.html',
  styleUrls: ['./loan-dialog.component.css']
})
export class LoanDialogComponent implements OnInit, OnChanges {
  constructor(
    bookService: BookService,
    loansService: LoansService,
    loanFieldsService: LoanFieldsService,
    formElementRef: ElementRef
  ) {
    this.loanModel = {
      reader: "",
      phone: "",
      bookId: "",
      startDate: "",
      duration: "",
      renew: false
    };
    this._bookService = bookService;
    this._loansService = loansService;
    this._loanFieldsService = loanFieldsService;
    this._formElementRef = formElementRef;
  }

  ngOnInit(): void {
      this._bookService.fetchBooks();
      this._loansService.fetchLoans();
  }

  ngOnChanges(changes: SimpleChanges): void {
      if(changes["indexToUpdate"].currentValue !== changes["indexToUpdate"].previousValue) {
        let indexToUpdate = changes["indexToUpdate"].currentValue;
        if(indexToUpdate === null) {
          this.loanModel = {
            reader: "",
            phone: "",
            bookId: "",
            startDate: "",
            duration: "",
            renew: false
          };
        }else {
          this.loanModel = this._loansService.selectedLoans[indexToUpdate].toFormData() as unknown as LoanFormModel;
        }
      }
  }

  async handleFormSubmit(form: NgForm) {
    if(!form.valid) {
      const firstInvalidInputName = Object.keys(form.controls).find(
        (controlName) => form.controls[controlName].invalid
      );
      this._formElementRef.nativeElement.querySelector(
        `[name=${firstInvalidInputName}] input`
      ).focus();
      return;
    }
    this.saveStatus = {
      variant: "load",
      heading: "Salvando",
      message: "As alterações estão sendo processadas pelo sistema"
    };
    let result: any;
    if(this.indexToUpdate !== null) {
      result = await this._loansService.updateLoan(this.indexToUpdate, this.loanModel);
    }else {
      result = await this._loansService.createLoan(this.loanModel);
    }
    if(result) {
      this.saveStatus = {
        variant: "error",
        heading: "Erro",
        message: "Ocorreu um erro ao salvar as alterações no sistema.",
        summary: "Detalhes do erro",
        details: result
      };
    }else {
      this.saveStatus = null;
      this._loanFieldsService.refreshFields();
      this.dialogClose.emit();
    }
  }

  handleDialogClose(event: MouseEvent) {
    event.preventDefault();
    this.dialogClose.emit();
  }

  handleErrorDialogClose() {
    this.saveStatus = null;
    this.dialogClose.emit();
  }

  get dialogTitle() {
    return (this.isUpdateDialog) ? "Editar empréstimo" : "Novo empréstimo";
  }

  get dialogTip() {
    return (this.isUpdateDialog) ? "Edite, abaixo, as informações desejadas e confirme suas alterações"
      : "Preencha as informações abaixo para cadastrar um novo empréstimo no sistema";
  }

  get isUpdateDialog() {
    return this.indexToUpdate !== null;
  }

  get bookTitles() {
    switch(this._bookService.status) {
      case "loaded": 
        return (this._bookService.selectedBooks.length > 0) ?
          this._bookService.selectedBooks.map((book) => book.title)
            : ["Nenhum livro encontrado"];
      case "loading": return [BOOKS_LOADING_MESSAGE];
      case "error": return [LOAD_ERROR_MESSAGE];
    }
  }

  get bookSelectorDisabled() {
    return this._bookService.status !== "loaded" || this._bookService.selectedBooks.length === 0;
  }

  get bookIds() {
    return this._bookService.selectedBooks.map((book) => book.id);
  }

  @Input()
  indexToUpdate: number | null = null;

  @Output()
  dialogClose = new EventEmitter<void>();

  loanModel: LoanFormModel;
  saveStatus: SaveStatus | null = null;

  private _bookService: BookService;
  private _loansService: LoansService;
  private _loanFieldsService: LoanFieldsService;
  private _formElementRef: ElementRef;
}
