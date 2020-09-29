import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainScreenComponent } from './components/main-screen/main-screen.component';
import { HeaderComponent } from './components/header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { AddDebtComponent } from './components/add-debtor/add-debtor.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './services/in-memory-data/in-memory-data.service';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { DebtorDialogComponent } from './components/debtor-dialog/debtor-dialog.component';
import { DebtComponent } from './components/debt/debt.component';
import { MatCardModule } from '@angular/material/card';
import { SearchComponent } from './components/search/search.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { httpInterceptorProviders } from './http-interceptors';
import { MatGridListModule } from '@angular/material/grid-list';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ProfileComponent } from './components/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    MainScreenComponent,
    HeaderComponent,
    AddDebtComponent,
    DebtorDialogComponent,
    DebtComponent,
    SearchComponent,
    NotFoundComponent,
    SignInComponent,
    SignUpComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HttpClientModule,

    MatDialogModule,
    CommonModule,
    MatCardModule,
    MatAutocompleteModule,
    MatSnackBarModule,
    MatGridListModule,
  ],
  providers: [
    MatDatepickerModule,
    MatNativeDateModule,
    ...httpInterceptorProviders,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
