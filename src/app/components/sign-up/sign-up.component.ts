import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  AbstractFormGroupDirective,
} from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ValidationErrorTypes } from 'src/app/validation-error-types';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { ValidationService } from 'src/app/services/validation/validation.service';
import { MinFieldLength, MinLength } from '../interfaces/min-field-length';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit, MinFieldLength {
  signUpForm: FormGroup;
  public minFieldLength: MinLength = {};

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router,
    public validationService: ValidationService
  ) {}

  ngOnInit(): void {
    this.minFieldLength['password'] = 6;

    this.signUpForm = this.formBuilder.group(
      {
        email: ['', [Validators.email, Validators.required]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(this.minFieldLength['password']),
          ],
        ],
        confirmedPassword: ['', [Validators.required]],
      },
      { validators: this.matchValues('password', 'confirmedPassword') }
    );
  }

  matchValues(
    first: string,
    second: string
  ): (AbstractControl: FormGroup) => ValidationErrors | null {
    return (formGroup: FormGroup): ValidationErrors | null => {
      return (formGroup &&
        formGroup.get(first) &&
        formGroup.get(second) &&
        formGroup.get(first).value === formGroup.get(second).value) ||
        (formGroup.get(first).value && !formGroup.get(second).value)
        ? null
        : { valuesNotMatching: true };
    };
  }

  onSubmit(formData) {
    if (
      !formData.email ||
      !formData.password ||
      !formData.confirmedPassword ||
      formData.password !== formData.confirmedPassword
    ) {
      console.log('Wrong input data');
      return;
    }
    this.authService
      .signUp({ email: formData.email, password: formData.password })
      .subscribe(
        (data) => {
          console.log(data.message);
          this.router.navigate(['/sign-in']);
        },
        (err) => {
          console.log(err);
          const errorMessage =
            err.error && err.error.message
              ? err.error.message
              : "There's some strange error...";
          this._snackBar.open(errorMessage, null, {
            duration: 2000,
          });
        }
      );
  }
}
