import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public isLoggedIn: boolean;
  constructor(public authService: AuthService, private router: Router) {
    this.authService.checkIsTokenValid().subscribe(
      (value) => {
        if (!value) {
          this.router.navigate(['/sign-in']);
        }
      },
      (err) => {
        this.router.navigate(['/sign-in']);
      }
    );
  }

  ngOnInit() {
    this.authService.isLoggedIn.subscribe(
      (value) => {
        this.isLoggedIn = value;
        if (!value) {
          this.router.navigate(['/sign-in']);
        }
      },
      (err) => {
        this.router.navigate(['/sign-in']);
      }
    );
  }

  signOut() {
    this.authService.signOut().subscribe(() => {
      this.router.navigate(['/sign-in']);
    });
  }
}
