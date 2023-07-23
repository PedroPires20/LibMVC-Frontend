import { Component, OnInit } from '@angular/core';
import { BookField, BookFieldsService } from 'src/services/book-fields.service';
import { BookService } from 'src/services/book.service';

interface Filters {
  isbn?: string,
  title?: string,
  author?: string,
  categories?: string[],
  publisher?: string,
  edition?: string,
  format?: string,
  date?: string,
  pages?: number,
  copies?: number,
  description?: string,
  location?: string,
}

const FIELD_LOADING_MESSAGE = "Carregando...";
const FIELD_ERROR_MESSAGE = "Ocorreu um erro ao carregar as opções do filtro";


@Component({
  selector: 'app-collection-inputs',
  templateUrl: './collection-inputs.component.html',
  styleUrls: ['./collection-inputs.component.css']
})
export class CollectionInputsComponent implements OnInit {
  constructor(private _bookService: BookService, private _bookFieldsService: BookFieldsService) {

  }

  ngOnInit() {
    this._bookFieldsService.fetchFields();
  }

  handleSearch() {
    this._bookService.fetchBooks(this.query, this.filters);
  }

  handleReset() {
    this.query = "";
    this.filters = {};
    this._bookService.fetchBooks();
  }

  get disabled() {
    return this._bookService.status === "loading" || this._bookService.status === "error";
  }

  get authorSelectorDisabled() {
    return this._bookFieldsService.author.loadStatus !== "loaded";
  }

  get authorOptions() {
    return this._handleFieldLoad(this._bookFieldsService.author);
  }

  get categoriesSelectorDisabled() {
    return this._bookFieldsService.categories.loadStatus !== "loaded";
  }

  get categoriesOptions() {
    return this._handleFieldLoad(this._bookFieldsService.categories);
  }

  get publisherSelectorDisabled() {
    return this._bookFieldsService.publisher.loadStatus !== "loaded";
  }

  get publisherOptions() {
    return this._handleFieldLoad(this._bookFieldsService.publisher);
  }

  get formatSelectorDisabled() {
    return this._bookFieldsService.format.loadStatus !== "loaded";
  }

  get formatOptions() {
    return this._handleFieldLoad(this._bookFieldsService.format);
  }

  private _handleFieldLoad(field: BookField) {
    if(field.loadStatus === "loading") {
      return [FIELD_LOADING_MESSAGE];
    }else if(field.loadStatus === "error") {
      return [FIELD_ERROR_MESSAGE];
    }
    return field.values;
  }

  query = "";
  filters: Filters = {};
}
