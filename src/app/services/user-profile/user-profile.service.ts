import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ChangeProfileData } from 'src/app/components/profile/dialog-interfaces/change-profile-info';
import { GetUserProfile } from 'src/app/interfaces/server-interfaces/get-user-profile';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  private baseUrl = 'api/users';
  constructor(private http: HttpClient) {}

  getProfileData() {
    return this.http.get<GetUserProfile>(`${this.baseUrl}/profile`);
  }

  changeProfileData(profileData: ChangeProfileData) {
    return this.http.put<any>(`${this.baseUrl}/profile`, profileData);
  }
  changePassword(passwords: ChangeProfileData) {
    return this.http.put<any>(`${this.baseUrl}/password`, passwords);
  }
}
