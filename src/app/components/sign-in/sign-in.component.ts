import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { ValidationErrorTypes } from 'src/app/validation-error-types';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ValidationService } from 'src/app/services/validation/validation.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  signInForm: FormGroup;
  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    public validationService: ValidationService
  ) {}

  ngOnInit(): void {
    this.signInForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(signInData): void {
    this.authService.signIn(signInData).subscribe(
      (value) => {
        if (value.token && value.success) {
          this.router.navigate(['/debts']);
        }
      },
      (err) => {
        console.log(err);
        const errorMessage =
          err.error && err.error.message
            ? err.error.message
            : "There's some strange error...";
        this.snackBar.open(errorMessage, null, {
          duration: 2000,
        });
      }
    );
  }
}
