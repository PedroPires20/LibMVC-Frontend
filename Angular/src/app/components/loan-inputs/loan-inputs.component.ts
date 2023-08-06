import { Component, OnInit } from '@angular/core';
import { LoansService } from 'src/services/loans.service';
import { LoanField, LoanFieldsService } from 'src/services/loan-fields.service';

interface Filters {
  reader?: string,
  bookTitle?: string,
  startDate?: string,
  endDate?: string,
  late?: boolean,
  renew?: boolean
}

const FIELD_LOADING_MESSAGE = "Carregando...";
const FIELD_LOADING_ERROR = "Ocorreu um erro ao carregar as opções do filtro";


@Component({
  selector: 'app-loan-inputs',
  templateUrl: './loan-inputs.component.html',
  styleUrls: ['./loan-inputs.component.css']
})
export class LoanInputsComponent implements OnInit {
  constructor(private _loansService: LoansService, private _loanFieldsService: LoanFieldsService) {

  }

  ngOnInit(): void {
      this._loanFieldsService.fetchFields();
  }

  handleFilter() {
    this._loansService.fetchLoans(this.filters);
  }

  handleReset() {
    this.filters = {};
    this._loansService.fetchLoans();
  }

  get readerSelectorDisabled() {
    return this._loanFieldsService.reader.loadStatus !== "loaded";
  }

  get readerOptions() {
    return this._handleFieldLoad(this._loanFieldsService.reader);
  }

  get bookTitleSelectorDisabled() {
    return this._loanFieldsService.bookTitle.loadStatus !== "loaded";
  }

  get bookTitleOptions() {
    return this._handleFieldLoad(this._loanFieldsService.bookTitle);
  }

  get disabled() {
    return this._loansService.status === "loading" || this._loansService.status === "error";
  }

  private _handleFieldLoad(filed: LoanField) {
    if(filed.loadStatus === "loading") {
      return [FIELD_LOADING_MESSAGE];
    }else if(filed.loadStatus === "error") {
      return [FIELD_LOADING_ERROR];
    }
    return filed.values;
  }

  filters: Filters = {};
}
