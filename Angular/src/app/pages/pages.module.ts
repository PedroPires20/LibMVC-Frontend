import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CollectionComponent } from './collection/collection.component';
import { ComponentsModule } from '../components/components.module';
import { LoansComponent } from './loans/loans.component';
import { DialogsModule } from '../dialogs/dialogs.module';



@NgModule({
  declarations: [
    CollectionComponent,
    LoansComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    ComponentsModule,
    DialogsModule
  ]
})
export class PagesModule { }
