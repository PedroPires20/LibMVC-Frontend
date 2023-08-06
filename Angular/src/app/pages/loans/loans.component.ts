import { Component, OnInit } from '@angular/core';
import { LoansService } from 'src/services/loans.service';


@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.css']
})
export class LoansComponent implements OnInit {
  constructor(private _loansService: LoansService) {

  }

  ngOnInit(): void {
    this._loansService.fetchLoans();
  }

  get loansLoading() {
    return this._loansService.status === "loading" || !this._loansService.status;
  }

  get errorLoading() {
    return this._loansService.status === "error";
  }

  get statusMessage() {
    switch(this._loansService.status) {
      case "loading": return "Carregando dados dos empréstimos...";
      case "error": return "Ocorreu um erro ao recuperar os dados dos empréstimos. Por favor, tente novamente.";
      default: return "Nenhum empréstimo foi encontrado";
    }
  }

  get loans() {
    return this._loansService.selectedLoans;
  }
}
