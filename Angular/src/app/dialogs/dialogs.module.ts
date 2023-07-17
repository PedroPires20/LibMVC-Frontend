import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookDialogComponent } from './book-dialog/book-dialog.component';
import { ComponentsModule } from '../components/components.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    BookDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ComponentsModule
  ],
  exports: [
    BookDialogComponent
  ]
})
export class DialogsModule { }
