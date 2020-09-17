import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUrl = 'api/auth';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  public isLoggedIn: Boolean = false;
  public redirectUrl: string;

  constructor(private http: HttpClient) {}

  signIn(credentials) {
    // do the weird stuff to get the user
    const user: User = {
      email: 'email@example.com',
      password: 'hGhFnTyNKtSX',
      id: '_hgeSo6',
    };
    let obsUser: Observable<User> = of(user);
    if (
      credentials.email !== user.email ||
      credentials.password !== user.password
    ) {
      this.isLoggedIn = false;
      obsUser = throwError("Can't find user");
    }
    this.isLoggedIn = true;
    return obsUser;
  }

  signOut() {
    this.isLoggedIn = false;
  }
}
