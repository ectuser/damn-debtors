import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
      confirmedPassword: new FormControl(),
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
