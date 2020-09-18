import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const url: string = state.url;
    return this.checkLogin(url);
  }

  checkLogin(url: string): Observable<UrlTree | boolean> | boolean {
    if (this.authService.isLoggedIn) {
      return true;
    }
    return this.authService.checkIsTokenValid().pipe(
      map((isAuthenticated) => {
        if (isAuthenticated) {
          return isAuthenticated;
        }
        this.authService.redirectUrl = url;
        return this.router.parseUrl('/sign-in');
      })
    );
  }
}
