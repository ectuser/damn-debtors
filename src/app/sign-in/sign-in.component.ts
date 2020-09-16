import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  signInForm: FormGroup;
  constructor() {}

  ngOnInit(): void {
    this.signInForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
    });
  }
}
