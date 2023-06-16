import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuComponent } from './menu/menu.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from './button/button.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { SpinnerComponent } from './spinner/spinner.component';



@NgModule({
  declarations: [
    MenuComponent,
    HeaderComponent,
    ButtonComponent,
    ProgressBarComponent,
    SpinnerComponent
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
    SpinnerComponent
  ]
})
export class ComponentsModule { }
