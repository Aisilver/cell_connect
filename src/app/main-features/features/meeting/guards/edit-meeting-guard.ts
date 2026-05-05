import { CanActivateFn } from '@angular/router';

export const editMeetingGuard: CanActivateFn = (route, state) => {
  return true;
};
