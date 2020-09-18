import { HttpClient, HttpHeaders } from '@angular/common/http';
import { parseI18nMeta } from '@angular/compiler/src/render3/view/i18n/meta';
import { Injectable } from '@angular/core';
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

  constructor(private http: HttpClient) {}

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
            localStorage.setItem('bearerToken', value.token);
            this.setBearerToken();
          }
        })
      );
  }

  signOut() {
    this.isLoggedIn = false;
  }

  setBearerToken() {
    const token = localStorage.getItem('bearerToken');
    if (token) {
      this.httpOptions.headers.set('Authorization', token);
      console.log(this.httpOptions.headers);
    } else {
    }
  }

  checkIsTokenValid() {
    const token = localStorage.getItem('bearerToken');
    this.httpOptions.headers.append('Authorization', token);
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
}
