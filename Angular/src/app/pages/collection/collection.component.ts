import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/services/book.service';
import { ContextMenuPosition } from 'src/app/components/context-menu/context-menu.component';

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
    if(action === 0) {

    }else if(action === 1) {

    }
    this.showContextMenu = false;
    this.clickTargetIndex = undefined;
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
  clickTargetIndex?: number;
}
