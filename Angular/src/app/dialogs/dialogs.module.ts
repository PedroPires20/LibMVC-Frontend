import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookDialogComponent } from './book-dialog/book-dialog.component';
import { ComponentsModule } from '../components/components.module';
import { FormsModule } from '@angular/forms';
import { LoanDialogComponent } from './loan-dialog/loan-dialog.component';



@NgModule({
  declarations: [
    BookDialogComponent,
    LoanDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ComponentsModule
  ],
  exports: [
    BookDialogComponent,
    LoanDialogComponent
  ]
})
export class DialogsModule { }
