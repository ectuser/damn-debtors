import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GetUserProfile } from 'src/app/interfaces/server-interfaces/get-user-profile';
import { UserProfileService } from 'src/app/services/user-profile/user-profile.service';
import { ChangeField } from './change-field';
import { ChangeUserDataDialogComponent } from './change-user-data-dialog/change-user-data-dialog.component';

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
    if (fieldToChange === ChangeField.Email) {
      const dialogRef = this.dialog.open(ChangeUserDataDialogComponent, {
        width: '250px',
        data: { email: this.shownData.email },
      });
    }
  }
}
