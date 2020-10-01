import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ChangeEmail } from 'src/app/components/profile/dialog-interfaces/change-email';
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

  changeEmail(email: ChangeEmail) {
    return this.http.put<any>(`${this.baseUrl}/profile`, email);
  }
}
