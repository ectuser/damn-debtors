import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddDebtorComponent } from './add-debtor/add-debtor.component';
import { MainScreenComponent } from './main-screen/main-screen.component';
import { DebtComponent } from './debt/debt.component';
import { SearchComponent } from './search/search.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/debts', pathMatch: 'full' },
  { path: 'add', component: AddDebtorComponent, canActivate: [AuthGuard] },
  { path: 'debts', component: MainScreenComponent, canActivate: [AuthGuard] },
  { path: 'debts/:id', component: DebtComponent, canActivate: [AuthGuard] },
  { path: 'search', component: SearchComponent, canActivate: [AuthGuard] },
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
];

// {path: '**', redirectTo: '/404'},
// {path: "404", component: NotFoundComponent}

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
