import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

interface LoanFormModel {
  reader: string,
  phone: string,
  bookId: string,
  startDate: string,
  duration: number | "",
  renew: boolean
}


@Component({
  selector: 'app-loan-dialog',
  templateUrl: './loan-dialog.component.html',
  styleUrls: ['./loan-dialog.component.css']
})
export class LoanDialogComponent {
  constructor() {
    this.loanModel = {
      reader: "",
      phone: "",
      bookId: "",
      startDate: "",
      duration: "",
      renew: false
    };
  }
  
  get dialogTitle() {
    return (this.isUpdateDialog) ? "Editar empréstimo" : "Novo empréstimo";
  }

  get dialogTip() {
    return (this.isUpdateDialog) ? "Edite, abaixo, as informações desejadas e confirme suas alterações"
      : "Preencha as informações abaixo para cadastrar um novo empréstimo no sistema";
  }

  get isUpdateDialog() {
    return this.indexToUpdate !== null;
  }

  handleFormSubmit(form: NgForm) {
    console.log(this.loanModel);
    this.formSubmit.emit();
  }

  handleDialogClose(event: MouseEvent) {
    event.preventDefault();
    this.dialogClose.emit();
  }

  @Input()
  indexToUpdate: number | null = null;

  @Output()
  dialogClose = new EventEmitter<void>();

  @Output()
  formSubmit = new EventEmitter<void>();

  loanModel: LoanFormModel;
}
