import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUrl = 'api/auth';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  signIn(credentials) {
    // do the weird stuff to get the user
    const user: User = {
      email: 'email@example.com',
      password: 'hGhFnTyNKtSX',
      id: '_hgeSo6',
    };
    const obsUser: Observable<User> = of(user);
    return obsUser;
  }
}
