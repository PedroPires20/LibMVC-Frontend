import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CollectionComponent } from './collection/collection.component';
import { ComponentsModule } from '../components/components.module';
import { LoansComponent } from './loans/loans.component';



@NgModule({
  declarations: [
    CollectionComponent,
    LoansComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule
  ]
})
export class PagesModule { }
