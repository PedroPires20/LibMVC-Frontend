import { Component, Output, EventEmitter } from '@angular/core';

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


@Component({
  selector: 'app-book-dialog',
  templateUrl: './book-dialog.component.html',
  styleUrls: ['./book-dialog.component.css']
})
export class BookDialogComponent {
  constructor() {
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

  @Output()
  dialogClose = new EventEmitter<void>();

  @Output()
  formSubmit = new EventEmitter<void>();

  isUpdateDialog = false;
  addCategory = false;
  newCategory = "";

  categories: string[] = []

  bookModel: BookFormModel;
}
