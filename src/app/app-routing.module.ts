import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddDebtorComponent } from './add-debtor/add-debtor.component';
import { MainScreenComponent } from './main-screen/main-screen.component';
import { DebtComponent } from './debt/debt.component';
import { SearchComponent } from './search/search.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/debts', pathMatch: 'full' },
  { path: 'add', component: AddDebtorComponent },
  { path: 'debts', component: MainScreenComponent },
  { path: 'debts/:id', component: DebtComponent },
  { path: 'search', component: SearchComponent },
];

// {path: '**', redirectTo: '/404'},
// {path: "404", component: NotFoundComponent}

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
