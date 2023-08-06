import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import NetworkClient from '@common/utils/network_client.js';


type LoadStatus = "loading" | "error" | "loaded";

export interface LoanField {
  loadStatus: LoadStatus,
  values: string[]
}

interface AvailableFields {
  reader: LoanField,
  bookTitle: LoanField,
}

@Injectable({
  providedIn: 'root'
})
export class LoanFieldsService {
  constructor() {
    this._api = new NetworkClient(environment.API_BASE_URL);
    this._fields = {
      reader: { loadStatus: "loading", values: [] },
      bookTitle: { loadStatus: "loading", values: [] }
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

  get reader() {
    return this._fields.reader;
  }

  get bookTitle() {
    return this._fields.bookTitle;
  }

  private async _fetchField(fieldName: keyof AvailableFields) {
    try {
      this._fields[fieldName].loadStatus = "loading";
      let fieldValues = await this._api.fetchLoanFieldValues(fieldName);
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
