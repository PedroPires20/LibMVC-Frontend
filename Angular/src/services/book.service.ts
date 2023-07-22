import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import NetworkClient from '@common/utils/network_client.js';
import Book from '@common/models/book.js';


@Injectable({
  providedIn: 'root'
})
export class BookService {
  constructor() {
    this._api = new NetworkClient(environment.API_BASE_URL);
    this._selectedBooks = [];
    this._errorMessage = "";

  }

  async fetchBooks(query = "", filters: any = {}) {
    this._status = "loading";
    try {
      let booksData = await this._api.searchBooks(query, filters, { title: 1 });
      this._selectedBooks = booksData.map((bookData: any, index: number) => new Book(bookData, index));
      this._status = "ok";
    }catch(exception: any) {
      console.error(exception);
      this._status = "error";
      this._errorMessage = exception?.message;
    }
  }

  get status() {
    return this._status || "loading";
  }

  get errorMessage() {
    return this._errorMessage;
  }

  get selectedBooks() {
    return this._selectedBooks;
  }

  private _api: NetworkClient;
  private _selectedBooks: Book[];
  private _status?: "loading" | "error" | "ok";
  private _errorMessage: string;
}
