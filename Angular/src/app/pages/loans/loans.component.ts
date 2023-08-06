import { Component, OnInit } from '@angular/core';
import { ContextMenuPosition } from 'src/app/components/context-menu/context-menu.component';
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
    console.log(action);
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
}
