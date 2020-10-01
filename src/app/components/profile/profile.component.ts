import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GetUserProfile } from 'src/app/interfaces/server-interfaces/get-user-profile';
import { UserProfileService } from 'src/app/services/user-profile/user-profile.service';
import { ChangeField } from './change-field';
import { ChangeUserDataDialogComponent } from './change-user-data-dialog/change-user-data-dialog.component';
import { ChangeProfileData } from './dialog-interfaces/change-profile-info';
import {
  ActionWith,
  CloseDialog,
  CloseDialogResult,
} from './dialog-interfaces/close-dialog-result';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  shownData: GetUserProfile;
  changeField = ChangeField;
  constructor(
    private userProfileService: UserProfileService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.userProfileService.getProfileData().subscribe(
      (value) => {
        this.shownData = value;
      },
      (err) => console.log(err)
    );
  }

  changeData(fieldToChange: ChangeField) {
    var data: ChangeProfileData =
      fieldToChange === ChangeField.Email
        ? { actionWith: ActionWith.Email, email: this.shownData.email }
        : fieldToChange === ChangeField.Password
        ? { actionWith: ActionWith.Password }
        : null;
    const dialogRef = this.dialog.open(ChangeUserDataDialogComponent, {
      width: '250px',
      data,
    });
    dialogRef.afterClosed().subscribe((result: CloseDialog) => {
      if (result.reason === CloseDialogResult.Updated) {
        if (result.actionWith === ActionWith.Email) {
          this.shownData.email = result.profileData.email;
        } else if (result.actionWith === ActionWith.Password) {
        }
      } else {
      }
    });
  }
}
