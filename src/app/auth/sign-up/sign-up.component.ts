import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
} from '@angular/forms';
import { AuthService } from '../auth.service';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ValidationErrorTypes } from 'src/app/validation-error-types';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;
  private passwordMinLength = 6;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {}
  matchValues(
    matchTo: string // name of the control to match to
  ): (AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      return !!control.parent &&
        !!control.parent.value &&
        control.value === control.parent.controls[matchTo].value
        ? null
        : { notMatching: true };
    };
  }

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: [
        '',
        [Validators.required, Validators.minLength(this.passwordMinLength)],
      ],
      confirmedPassword: [
        '',
        [Validators.required, this.matchValues('password')],
      ],
    });
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
        },
        (err) => {
          console.log(err);
        }
      );
  }

  getEmailErrorMessage() {
    const email = this.signUpForm.get('email');
    return email.hasError('required')
      ? ValidationErrorTypes.FIELD_REQUIRED
      : email.hasError('email')
      ? ValidationErrorTypes.INVALID_EMAIL
      : '';
  }
  getPasswordErrorMessage() {
    const password = this.signUpForm.get('password');
    return password.hasError('required')
      ? ValidationErrorTypes.FIELD_REQUIRED
      : password.hasError('minlength')
      ? ValidationErrorTypes.MIN_LENGTH(this.passwordMinLength)
      : '';
  }
  getConfirmedPasswordErrorMessage() {
    const confirmedPassword = this.signUpForm.get('confirmedPassword');
    console.log(confirmedPassword, confirmedPassword.hasError('isMatching'));
    return confirmedPassword.hasError('required')
      ? ValidationErrorTypes.FIELD_REQUIRED
      : confirmedPassword.hasError('notMatching')
      ? ValidationErrorTypes.PASSWORDS_DO_NOT_MATCH
      : '';
  }
}
