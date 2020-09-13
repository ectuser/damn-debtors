import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddDebtorComponent } from './add-debtor/add-debtor.component';
import { MainScreenComponent } from './main-screen/main-screen.component';

const routes: Routes = [
  {path: "", redirectTo: '/debtors', pathMatch: "full"},
  {path: "add", component: AddDebtorComponent},
  {path: "debtors", component: MainScreenComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
