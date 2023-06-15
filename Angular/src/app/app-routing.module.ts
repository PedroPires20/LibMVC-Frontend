import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CollectionComponent } from './pages/collection/collection.component';
import { LoansComponent } from './pages/loans/loans.component';

const routes: Routes = [
  {
    path: "collection",
    component: CollectionComponent
  },
  {
    path: "loans",
    component: LoansComponent
  },
  {
    path: "",
    pathMatch: "full",
    redirectTo: "collection"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
