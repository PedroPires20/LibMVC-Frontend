import { Component } from '@angular/core';

@Component({
  selector: 'app-loan-dialog',
  templateUrl: './loan-dialog.component.html',
  styleUrls: ['./loan-dialog.component.css']
})
export class LoanDialogComponent {
  
  get dialogTitle() {
    return (this.isUpdateDialog) ? "Editar empréstimo" : "Novo empréstimo";
  }

  get dialogTip() {
    return (this.isUpdateDialog) ? "Edite, abaixo, as informações desejadas e confirme suas alterações"
      : "Preencha as informações abaixo para cadastrar um novo empréstimo no sistema";
  }

  isUpdateDialog = false;
}
