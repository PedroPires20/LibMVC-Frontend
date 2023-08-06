import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import NetworkClient from '@common/utils/network_client.js';
import Book from '@common/models/book.js';
import { removeEmptyFilters, objectEquals } from '@common/utils/utils.js';


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
    const currentFilters = removeEmptyFilters(filters);
    if(this._shouldRefetchBooks(query, currentFilters)) {
      this._status = "loading";
      try {
        let booksData = await this._api.searchBooks(query, currentFilters, { title: 1 });
        this._selectedBooks = booksData.map((bookData: any, index: number) => new Book(bookData, index));
        this._status = "loaded";
      }catch(exception: any) {
        console.error("Error fetching books: " + exception);
        this._status = "error";
        this._errorMessage = exception?.message;
      }
      this._previousQuery = query;
      this._previousFilters = currentFilters;
    }
  }

  async createBook(formData: any) {
    let newBook = Book.fromFormData(formData);
    try {
      let { createdId } = await this._api.createBook(newBook.toRequestBody());
      this._selectedBooks.push(Book.fromFormData(formData, createdId));
    }catch(exception: any) {
      console.error("Error creating book: " + exception);
      return exception.message || "Error creating book";
    }
  }

  async updateBook(bookIndex: number, newData: any) {
    let updatedBook = Book.fromFormData(newData, this._selectedBooks[bookIndex].id, bookIndex);
    let diff = this._selectedBooks[bookIndex].getFieldsDiff(updatedBook);
    if(!!diff) {
      try {
        await this._api.updateBook(updatedBook.id, updatedBook.toRequestBody());
        this._selectedBooks[bookIndex] = updatedBook;
      }catch(exception: any) {
        console.error("Error updating book: " + exception);
        return exception.message || "Error updating book";
      }
    }
  }

  async deleteBook(bookIndex: number) {
    try {
      await this._api.deleteBook(this._selectedBooks[bookIndex].id);
      this.selectedBooks.splice(bookIndex);
    }catch(exception: any) {
      console.error("Error deleting book: " + exception);
      return exception.message || "Error deleting book";
    }
  }

  private _shouldRefetchBooks(query: string, filters: any) {
    return (this._previousQuery !== query) || (!objectEquals(this._previousFilters, filters));
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
  private _status?: "loading" | "error" | "loaded";
  private _errorMessage: string;
  private _previousQuery?: string;
  private _previousFilters: any;
}
