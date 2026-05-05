import { CanActivateFn } from '@angular/router';

export const bookMeetingGuard: CanActivateFn = (route, state) => {
  return true;
};
