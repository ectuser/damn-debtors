import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddDebtComponent } from './components/add-debtor/add-debtor.component';
import { MainScreenComponent } from './components/main-screen/main-screen.component';
import { DebtComponent } from './components/debt/debt.component';
import { SearchComponent } from './components/search/search.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthGuard } from './guards/auth.guard';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';

const routes: Routes = [
  { path: 'add', component: AddDebtComponent, canActivate: [AuthGuard] },
  {
    path: 'debts',
    component: MainScreenComponent,
    canActivate: [AuthGuard],
  },
  { path: 'debts/:id', component: DebtComponent, canActivate: [AuthGuard] },
  { path: 'search', component: SearchComponent, canActivate: [AuthGuard] },

  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  {
    path: '',
    redirectTo: '/debts',
    pathMatch: 'full',
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
