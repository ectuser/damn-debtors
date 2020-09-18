import { HttpClient, HttpHeaders } from '@angular/common/http';
import { parseI18nMeta } from '@angular/compiler/src/render3/view/i18n/meta';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { catchError, finalize, map, tap } from 'rxjs/operators';
import { User } from '../models/user';

interface AuthResult {
  success: Boolean;
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUrl = 'api/auth';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  public isLoggedIn = false;
  public redirectUrl: string;

  constructor(private http: HttpClient, private router: Router) {}

  signIn(credentials) {
    // do the weird stuff to get the user
    return this.http
      .post<AuthResult>('/api/login', credentials, this.httpOptions)
      .pipe(
        tap(() => {
          this.isLoggedIn = true;
        }),
        catchError((err) => {
          this.isLoggedIn = false;
          return throwError(err);
        }),
        tap((value) => {
          if (this.isLoggedIn) {
            this.setAuthorizationToken(value.token);
          }
        })
      );
  }

  signOut() {
    this.isLoggedIn = false;
    this.setAuthorizationToken('');
    this.router.navigate(['/sign-in']);
  }

  checkIsTokenValid() {
    console.log('fucking options', this.httpOptions);
    return this.http.get('/api/check-the-token', this.httpOptions).pipe(
      tap(() => {
        this.isLoggedIn = true;
      }),
      catchError((err) => {
        this.isLoggedIn = false;
        return of(false);
      }),
      map(() => this.isLoggedIn)
    );
  }

  getAuthorizationToken() {
    return localStorage.getItem('bearerToken');
  }
  setAuthorizationToken(value: string) {
    localStorage.setItem('bearerToken', value);
  }
}
