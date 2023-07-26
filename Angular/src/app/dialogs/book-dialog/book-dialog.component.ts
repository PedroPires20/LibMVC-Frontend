import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-book-dialog',
  templateUrl: './book-dialog.component.html',
  styleUrls: ['./book-dialog.component.css']
})
export class BookDialogComponent {
  handleCategoriesChange(selectedCategories: any) {
    if(selectedCategories.includes("Nova categoria")) {
      this.addCategory = true;
      this.selectedCategories = this.selectedCategories.filter(
        (category) => category !== "Nova categoria"
      );
    }
  }

  handleCategoryAdd(event: KeyboardEvent) {
    if(event.key === "Enter") {
      if(this.newCategory !== "" && !this.categories.includes(this.newCategory)) {
        this.categories.push(this.newCategory);
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
  selectedCategories: string[] = []
}
