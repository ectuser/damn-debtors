import { Component, OnInit } from '@angular/core';
import { GetUserProfile } from 'src/app/interfaces/server-interfaces/get-user-profile';
import { UserProfileService } from 'src/app/services/user-profile/user-profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  shownData: GetUserProfile;
  constructor(private userProfileService: UserProfileService) {}

  ngOnInit(): void {
    this.userProfileService.getProfileData().subscribe(
      (value) => {
        this.shownData = value;
      },
      (err) => console.log(err)
    );
  }
}
