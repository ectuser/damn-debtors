import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserProfileService } from 'src/app/services/user-profile/user-profile.service';
import { ValidationService } from 'src/app/services/validation/validation.service';
import { ChangeProfileData } from '../dialog-interfaces/change-profile-info';
import { ChangePassword } from '../dialog-interfaces/change-password';
import {
  ActionWith,
  CloseDialog,
  CloseDialogResult,
} from '../dialog-interfaces/close-dialog-result';

@Component({
  selector: 'app-change-user-data-dialog',
  templateUrl: './change-user-data-dialog.component.html',
  styleUrls: ['./change-user-data-dialog.component.scss'],
})
export class ChangeUserDataDialogComponent implements OnInit {
  changeForm: FormGroup;
  actionWith = ActionWith;
  constructor(
    public dialogRef: MatDialogRef<ChangeUserDataDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ChangeProfileData,
    public validationService: ValidationService,
    private userProfileService: UserProfileService
  ) {}

  ngOnInit() {
    if (this.data.actionWith === ActionWith.Email) {
      this.changeForm = new FormGroup({
        email: new FormControl(this.data.email, [
          Validators.required,
          Validators.email,
        ]),
      });
    } else if (this.data.actionWith === ActionWith.Password) {
      this.changeForm = new FormGroup({
        oldPassword: new FormControl('', [Validators.required]),
        newPassword: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
        ]),
      });
    }
    console.log(this.changeForm);
  }

  onSubmit() {
    console.log(this.changeForm.get('email'));
    if (this.data.actionWith === ActionWith.Email) {
      this.userProfileService
        .changeProfileData(this.changeForm.value)
        .subscribe(
          (_) => {
            const result: CloseDialog = {
              reason: CloseDialogResult.Updated,
              actionWith: ActionWith.Email,
              profileData: this.changeForm.value,
            };
            this.dialogRef.close(result);
          },
          (err) => console.log(err)
        );
    } else if (this.data.actionWith === ActionWith.Password) {
      this.userProfileService.changePassword(this.changeForm.value).subscribe(
        (value) => {
          this.dialogRef.close();
        },
        (err) => console.log(err)
      );
    }
  }
}
