import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuComponent } from './menu/menu.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from './button/button.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { DialogComponent } from './dialog/dialog.component';
import { TableCardComponent } from './table-card/table-card.component';
import { DataCellDirective } from './table-card/data-cell.directive';


@NgModule({
  declarations: [
    MenuComponent,
    HeaderComponent,
    ButtonComponent,
    ProgressBarComponent,
    SpinnerComponent,
    DialogComponent,
    TableCardComponent,
    DataCellDirective
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    MenuComponent,
    HeaderComponent,
    ButtonComponent,
    ProgressBarComponent,
    SpinnerComponent,
    DialogComponent,
    TableCardComponent,
    DataCellDirective
  ]
})
export class ComponentsModule { }
