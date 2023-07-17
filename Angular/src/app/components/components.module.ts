import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";

import { MenuComponent } from './menu/menu.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from './button/button.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { DialogComponent } from './dialog/dialog.component';
import { TableCardComponent } from './table-card/table-card.component';
import { DataCellDirective } from './table-card/data-cell.directive';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { SearchBoxComponent } from './search-box/search-box.component';
import { TextAreaComponent } from './text-area/text-area.component';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { ContextMenuComponent } from './context-menu/context-menu.component';
import { InputComponent } from './input/input.component';
import { SelectComponent } from './select/select.component';
import { CollectionInputsComponent } from './collection-inputs/collection-inputs.component';
import { LoanInputsComponent } from './loan-inputs/loan-inputs.component';


@NgModule({
  declarations: [
    MenuComponent,
    HeaderComponent,
    ButtonComponent,
    ProgressBarComponent,
    SpinnerComponent,
    DialogComponent,
    TableCardComponent,
    DataCellDirective,
    CheckboxComponent,
    SearchBoxComponent,
    TextAreaComponent,
    DatePickerComponent,
    ContextMenuComponent,
    InputComponent,
    SelectComponent,
    CollectionInputsComponent,
    LoanInputsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    MenuComponent,
    HeaderComponent,
    ButtonComponent,
    ProgressBarComponent,
    SpinnerComponent,
    DialogComponent,
    TableCardComponent,
    DataCellDirective,
    CheckboxComponent,
    SearchBoxComponent,
    TextAreaComponent,
    DatePickerComponent,
    ContextMenuComponent,
    InputComponent,
    SelectComponent,
    CollectionInputsComponent,
    LoanInputsComponent
  ]
})
export class ComponentsModule { }
