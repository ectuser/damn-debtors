import { ChangeProfileData } from './change-profile-info';

export enum CloseDialogResult {
  Updated,
}
export enum ActionWith {
  Email,
  Password,
}
export interface CloseDialog {
  reason: CloseDialogResult;
  actionWith: ActionWith;
  profileData?: ChangeProfileData;
}
