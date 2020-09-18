import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  signInForm: FormGroup;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.signInForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
    });
  }

  onSubmit(signInData): void {
    console.log(signInData);
    this.authService.signIn(signInData).subscribe(
      (value) => {
        console.log(value);
        if (value.token && value.success) {
          localStorage.setItem('bearerToken', value.token);
          this.authService.setBearerToken();
          this.router.navigate(['/debts']);
        }
      },
      (err) => console.log(err)
    );
  }
}
