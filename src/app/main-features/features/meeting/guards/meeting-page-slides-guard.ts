import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { MeetingPageService } from '../services/meeting-page.service';
import { firstValueFrom } from 'rxjs';
export const meetingPageSlidesGuard: CanActivateFn = async (route, state) => {

  const service = inject(MeetingPageService)

  await firstValueFrom(service.$getMeetingPageSlides)

  return true;
};
