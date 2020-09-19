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

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;

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
        : { isMatching: false };
    };
  }

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required],
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
}
