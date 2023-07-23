import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import NetworkClient from '@common/utils/network_client.js';

type LoadStatus = "loading" | "error" | "loaded";

export interface BookField {
  loadStatus: LoadStatus,
  values: string[]
}

interface AvailableFields {
  author: BookField,
  categories: BookField,
  publisher: BookField,
  format: BookField
}


@Injectable({
  providedIn: 'root'
})
export class BookFieldsService {
  constructor() { 
    this._api = new NetworkClient(environment.API_BASE_URL);
    this._fields = {
      author: { loadStatus: "loading", values: [] },
      categories: { loadStatus: "loading", values: [] },
      publisher: { loadStatus: "loading", values: [] },
      format: { loadStatus: "loading", values: [] }
    };
    this._numFields = Object.keys(this._fields).length;
    this._loadedFields = 0;
  }

  fetchFields() {
    if(this._loadedFields !== this._numFields) {
      let fieldName: keyof AvailableFields;
      for(fieldName in this._fields) {
        this._fetchField(fieldName);
      }
    }
  }

  refreshFields() {
    this._loadedFields = 0;
    this.fetchFields();
  }

  get author() {
    return this._fields.author;
  }

  get categories() {
    return this._fields.categories;
  }

  get publisher() {
    return this._fields.publisher;
  }

  get format() {
    return this._fields.format;
  }

  private async _fetchField(fieldName: keyof AvailableFields) {
    try {
      this._fields[fieldName].loadStatus = "loading";
      let fieldValues = await this._api.fetchBookFieldValues(fieldName);
      this._fields[fieldName].values = fieldValues.filter((value: any) => value !== "");
      this._fields[fieldName].loadStatus = "loaded";
      this._loadedFields++;
    }catch(exception: any) {
      console.error(exception);
      this._fields[fieldName].values = [];
      this._fields[fieldName].loadStatus = "error";
    }
  }

  private _api: NetworkClient;
  private _fields: AvailableFields;
  private readonly _numFields: number;
  private _loadedFields: number;
}
