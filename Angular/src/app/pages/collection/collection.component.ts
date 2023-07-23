import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/services/book.service';

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

}
