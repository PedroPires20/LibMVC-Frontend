import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuComponent } from './menu/menu.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from './button/button.component';



@NgModule({
  declarations: [
    MenuComponent,
    HeaderComponent,
    ButtonComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    MenuComponent,
    HeaderComponent,
    ButtonComponent
  ]
})
export class ComponentsModule { }
