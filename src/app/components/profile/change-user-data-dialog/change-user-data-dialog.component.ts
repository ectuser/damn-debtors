import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserProfileService } from 'src/app/services/user-profile/user-profile.service';
import { ValidationService } from 'src/app/services/validation/validation.service';
import { ChangeEmail } from '../dialog-interfaces/change-email';
import { ChangePassword } from '../dialog-interfaces/change-password';

@Component({
  selector: 'app-change-user-data-dialog',
  templateUrl: './change-user-data-dialog.component.html',
  styleUrls: ['./change-user-data-dialog.component.scss'],
})
export class ChangeUserDataDialogComponent implements OnInit {
  changeForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<ChangeUserDataDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ChangeEmail,
    public validationService: ValidationService,
    private userProfileService: UserProfileService
  ) {}

  ngOnInit() {
    this.changeForm = new FormGroup({
      email: new FormControl(this.data.email, [
        Validators.required,
        Validators.email,
      ]),
    });
  }

  onSubmit() {
    console.log(this.changeForm.get('email'));

    this.userProfileService
      .changeEmail(this.changeForm.get('email').value)
      .subscribe(
        (value) => {
          console.log(value);
        },
        (err) => console.log(err)
      );
  }
}
