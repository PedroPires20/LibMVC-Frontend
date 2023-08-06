import { Component, OnInit } from '@angular/core';
import { ContextMenuPosition } from 'src/app/components/context-menu/context-menu.component';
import { LoansService } from 'src/services/loans.service';
import { LoanFieldsService } from 'src/services/loan-fields.service';

interface LoanFinishState {
  variant: "success" | "error" | "load",
  heading: string,
  message: string,
  buttonLabels?: string[],
  summary?: string,
  details?: string
}


@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.css']
})
export class LoansComponent implements OnInit {
  constructor(private _loansService: LoansService, private _loanFieldsService: LoanFieldsService) {

  }

  ngOnInit(): void {
    this._loansService.fetchLoans();
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
    this.showContextMenu = false;
    if(action === 0) {
      this.showLoanDialog = true;
    }else if(action === 1) {
      this.finishDialogState = {
        variant: "success",
        heading: "Finalizar empréstimo?",
        message: "Deseja finalizar esse empréstimo?\nUma vez finalizado, o livro é considerado como devolvido e os dados relacionados ao empréstimo são excluídos",
        buttonLabels: ["Sim", "Não"]
      }
    }
  }

  handleLoanDialogClose() {
    this.clickTargetIndex = null;
    this.showLoanDialog = false;
  }

  handleFinishDialogClose(action: number) {
    if(this.finishDialogState?.variant === "success" && action === 0
      && this.clickTargetIndex !== null) {
        this._handleLoanFinish();
    }else {
      this.finishDialogState = null;
    }
  }

  private async _handleLoanFinish() {
    if(this.clickTargetIndex !== null) {
      this.finishDialogState = {
        variant: "load",
        heading: "Salvando",
        message: "As alterações estão sendo processadas pelo sistema"
      };
      let result = await this._loansService.finishLoan(this.clickTargetIndex);
      if(result) {
        this.finishDialogState = {
          variant: "error",
          heading: "Erro",
          message: "Ocorreu um erro ao salvar as alterações no sistema.",
          summary: "Detalhes do erro",
          details: result
        };
        return;
      }
      this._loanFieldsService.refreshFields();
    }
    this.finishDialogState = null;
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

  showContextMenu = false;
  contextMenuPosition: ContextMenuPosition = { x: 0, y: 0 };
  clickTargetIndex: number | null = null;
  finishDialogState: LoanFinishState | null = null;
  showLoanDialog = false;
}
