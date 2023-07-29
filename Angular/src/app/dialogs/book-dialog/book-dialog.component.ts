import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BookFieldsService } from 'src/services/book-fields.service';
import { BookService } from 'src/services/book.service';

interface BookFormModel {
  isbn: string,
  title: string,
  author: string,
  categories: string[],
  publisher: string,
  edition: string,
  format: string,
  date: string,
  pages: number | "",
  copies: number | null | "",
  description: string,
  location: string
}

interface SaveStatus {
  variant: "error" | "load",
  heading: string,
  message: string,
  buttons?: string[],
  summary?: string,
  details?: string
}


@Component({
  selector: 'app-book-dialog',
  templateUrl: './book-dialog.component.html',
  styleUrls: ['./book-dialog.component.css']
})
export class BookDialogComponent implements OnInit, OnChanges {
  constructor(bookService: BookService, bookFieldsService: BookFieldsService, formElementRef: ElementRef) {
    this.bookModel = {
      isbn: "",
      title: "",
      author: "",
      categories: [],
      publisher: "",
      edition: "",
      format: "",
      date: "",
      pages: "",
      copies: "",
      description: "",
      location: ""
    };
    this._bookService = bookService;
    this._bookFieldsService = bookFieldsService;
    this._formElementRef = formElementRef;
  }

  ngOnInit(): void {
    this.categories = this._bookFieldsService.categories.values;
  }

  ngOnChanges(changes: SimpleChanges): void {
      if(changes["indexToUpdate"].currentValue !== changes["indexToUpdate"].previousValue) {
        let indexToUpdate = changes["indexToUpdate"].currentValue;
        if(indexToUpdate === null) {
          this.bookModel = {
            isbn: "",
            title: "",
            author: "",
            categories: [],
            publisher: "",
            edition: "",
            format: "",
            date: "",
            pages: "",
            copies: "",
            description: "",
            location: ""
          };
        }else {
          this.bookModel = this._bookService.selectedBooks[indexToUpdate].toFormData() as unknown as BookFormModel;
        }
      }
  }

  handleCategoriesChange(selectedCategories: any) {
    if(selectedCategories.includes("Nova categoria")) {
      this.addCategory = true;
    }
    this.bookModel.categories = selectedCategories.filter(
      (category: any) => category !== "Nova categoria"
    );
  }

  handleCategoryAdd(event: KeyboardEvent) {
    if(event.key === "Enter") {
      if(this.newCategory !== "" && !this.categories.includes(this.newCategory)) {
        this.categories.push(this.newCategory);
        this.bookModel.categories.push(this.newCategory);
      }
      this.newCategory = "";
      this.addCategory = false;
    }else if(event.key === "Escape") {
      this.addCategory = false;
    }
  }

  handleDialogClose(event: MouseEvent) {
    event.preventDefault();
    this.dialogClose.emit();
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
      result = await this._bookService.updateBook(this.indexToUpdate, this.bookModel);
    }else {
      result = await this._bookService.createBook(this.bookModel);
    }
    if(result) {
      this.saveStatus = {
        variant: "error",
        heading: "Erro",
        message: "Ocorreu um erro ao salvar as alterações no sistema.",
        buttons: ["Ok"],
        summary: "Detalhes do erro",
        details: result
      };
    }else {
      this.saveStatus = null;
      this.dialogClose.emit();
    }
  }

  handleErrorDialogClose() {
    this.saveStatus = null;
    this.dialogClose.emit();
  }

  get dialogTitle() {
    return (this.isUpdateDialog) ? "Editar livro" : "Adicionar novo livro";
  }

  get dialogTip() {
    return (this.isUpdateDialog) ?
      "Edite, abaixo, as informações desejadas e confirme suas alterações"
        : "Preencha as informações abaixo para cadastrar um novo livro";
  }

  get categoryOptions() {
    return [...this.categories, "Nova categoria"]
  }

  get categoriesLoadStatus() {
    return this._bookFieldsService.categories.loadStatus;
  }

  get isUpdateDialog() {
    return this.indexToUpdate !== null;
  }

  @Input()
  indexToUpdate: number | null = null;

  @Output()
  dialogClose = new EventEmitter<void>();

  @Output()
  formSubmit = new EventEmitter<void>();

  addCategory = false;
  newCategory = "";
  categories: string[] = []
  saveStatus: SaveStatus | null = null;
  bookModel: BookFormModel;

  private _bookService: BookService;
  private _bookFieldsService: BookFieldsService;
  private _formElementRef: ElementRef;
}
