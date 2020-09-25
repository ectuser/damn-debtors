import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    _route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const url: string = state.url;
    console.log('guard fired');
    return this.checkLogin(url);
  }

  checkLogin(
    url: string
  ): Observable<UrlTree | boolean> | boolean | Promise<boolean | UrlTree> {
    return this.authService.isLoggedIn.pipe(
      map((value) => {
        console.log('login fire', value);
        return value || this.router.parseUrl('/sign-in');
      })
    );

    // this.authService.checkIsTokenValid().subscribe((value) => {
    //   return value ? res(value) : res(this.router.parseUrl('/sign-in'));
    // });
    // this.authService.isLoggedIn.pipe(
    //   map((value) => {
    //     if (value) {
    //       return res(true);
    //     }
    //     this.authService.checkIsTokenValid().subscribe((value) => {
    //       return res(value);
    //     });
    //   })
    // );

    // return this.authService.checkIsTokenValid().pipe(
    //   map((isAuthenticated) => {
    //     if (isAuthenticated) {
    //       return isAuthenticated;
    //     }
    //     this.authService.redirectUrl = url;
    //     return this.router.parseUrl('/sign-in');
    //   })
    // );
  }
}
