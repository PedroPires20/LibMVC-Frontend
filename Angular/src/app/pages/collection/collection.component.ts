import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/services/book.service';
import { ContextMenuPosition } from 'src/app/components/context-menu/context-menu.component';

interface BookDeleteState {
  variant: "delete" | "error" | "load",
  heading: string,
  message: string,
  buttonLabels?: string[],
  summary?: string,
  details?: string
}


@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit {
  constructor(private _bookService: BookService) {

  }

  ngOnInit(): void {
    this._bookService.fetchBooks();
  }

  handleRowClick(event: MouseEvent, index: number) {
    const target = event.target as HTMLElement;
    const { top, left, width, height } = target.getBoundingClientRect();
    this.contextMenuPosition = { x: left, y: top + height };
    this.showContextMenu = true;
    this.clickTargetIndex = index;
    event.stopPropagation();
  }

  handleContextMenuClose(action?: number) {
    this.showContextMenu = false;
    if(action === 0) {
      this.showBookDialog = true;
    }else if(action === 1) {
      this.deleteDialogState = {
        variant: "delete",
        heading: "Apagar Livro?",
        message: `Deseja remover o livro "${this.books[this.clickTargetIndex || 0].title}" do acervo?\nUma vez excluído, as informações desse livro não poderão ser recuperadas!`,
        buttonLabels: ["Sim", "Não"]
      };
    }
  }

  handleBookDialogClose() {
    this.showBookDialog = false;
    this.clickTargetIndex = null;
  }

  handleDeleteDialogClose(action: number) {
    if(this.deleteDialogState?.variant === "delete" && action === 0
      && this.clickTargetIndex !== null) {
        this._handleBookDelete()
    }else {
      this.deleteDialogState = null;
    }
  }

  async _handleBookDelete() {
    if(this.clickTargetIndex !== null) {
      this.deleteDialogState = {
        variant: "load",
        heading: "Salvando",
        message: "As alterações estão sendo processadas pelo sistema"
      }
      let result = await this._bookService.deleteBook(this.clickTargetIndex);
      if(result) {
        this.deleteDialogState = {
          variant: "error",
          heading: "Erro",
          message: "Ocorreu um erro ao salvar as alterações no sistema.",
          summary: "Detalhes do erro",
          details: result
        };
        return;
      }
    }
    this.deleteDialogState = null;
  }

  get booksLoading() {
    return this._bookService.status === "loading" || !this._bookService.status;
  }

  get errorLoading() {
    return this._bookService.status === "error";
  }

  get statusMessage() {
    switch(this._bookService.status) {
      case "loading": return "Carregando dados do acervo...";
      case "error": return "Ocorreu um erro ao recuperar os dados do acervo. Por favor, tente novamente.";
      default: return "Nenhum livro foi encontrado";
    }
  }

  get books() {
    return this._bookService.selectedBooks;
  }

  showContextMenu = false;
  contextMenuPosition: ContextMenuPosition = { x: 0, y: 0 };
  clickTargetIndex: number | null = null;
  deleteDialogState: BookDeleteState | null = null;
  showBookDialog = false;
}
