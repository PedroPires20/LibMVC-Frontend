import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BookService } from 'src/services/book.service';

interface LoanFormModel {
  reader: string,
  phone: string,
  bookId: string,
  startDate: string,
  duration: number | "",
  renew: boolean
}

const BOOKS_LOADING_MESSAGE = "Carregando...";
const LOAD_ERROR_MESSAGE = "Ocorreu um erro ao carregar os livros disponíveis";


@Component({
  selector: 'app-loan-dialog',
  templateUrl: './loan-dialog.component.html',
  styleUrls: ['./loan-dialog.component.css']
})
export class LoanDialogComponent implements OnInit {
  constructor(bookService: BookService) {
    this.loanModel = {
      reader: "",
      phone: "",
      bookId: "",
      startDate: "",
      duration: "",
      renew: false
    };
    this._bookService = bookService;
  }

  ngOnInit(): void {
      this._bookService.fetchBooks();
  }

  handleFormSubmit(form: NgForm) {
    console.log(this.loanModel);
    this.formSubmit.emit();
  }

  handleDialogClose(event: MouseEvent) {
    event.preventDefault();
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

  @Output()
  formSubmit = new EventEmitter<void>();

  loanModel: LoanFormModel;

  private _bookService: BookService;
}
