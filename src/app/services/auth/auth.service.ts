import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

interface SignInResult {
  success: boolean;
  token: string;
}
interface SignUpResult {
  success: boolean;
  message: string;
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
      .post<SignInResult>(
        `${this.authUrl}/login`,
        credentials,
        this.httpOptions
      )
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

  signUp(credentials) {
    let success: boolean = true;
    return this.http
      .post<SignUpResult>(
        `${this.authUrl}/register`,
        credentials,
        this.httpOptions
      )
      .pipe(
        catchError((err) => {
          success = false;
          console.log(err);
          return throwError(err);
        })
      );
  }

  signOut() {
    this.isLoggedIn = false;
    this.setAuthorizationToken('');
    return new Observable((subscriber) => {
      subscriber.next({ message: 'success' });
    });
  }

  checkIsTokenValid() {
    console.log('fucking options', this.httpOptions);
    return this.http
      .get(`${this.authUrl}/check-the-token`, this.httpOptions)
      .pipe(
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
