import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import NetworkClient from '@common/utils/network_client.js';
import Loan from '@common/models/loan.js';
import { removeEmptyFilters, objectEquals } from '@common/utils/utils.js';


@Injectable({
  providedIn: 'root'
})
export class LoansService {
  constructor() {
    this._api = new NetworkClient(environment.API_BASE_URL);
    this._selectedLoans = [];
    this._errorMessage = "";
  }

  async fetchLoans(filters: any = {}) {
    const currentFilters = removeEmptyFilters(filters);
    if(!objectEquals(this._previousFilters, currentFilters)) {
      this._status = "loading";
      try {
        let loansData = await this._api.fetchLoans(
          currentFilters,
          { reader: 1, bookTitle: 1, startDate: -1 }
        );
        this._selectedLoans = loansData.map((loanData: any, index: number) => new Loan(loanData, index))
        this._status = "loaded";
      }catch(exception: any) {
        console.error("Error fetching loans: " + exception);
        this._status = "error";
        this._errorMessage = exception.message;
      }
      this._previousFilters = currentFilters;
    }
  }

  get status() {
    return this._status || "loading";
  }

  get errorMessage() {
    return this._errorMessage;
  }

  get selectedLoans() {
    return this._selectedLoans;
  }

  private _api: NetworkClient;
  private _selectedLoans: Loan[];
  private _status?: "loading" | "error" | "loaded";
  private _errorMessage: string;
  private _previousFilters: any;
}
