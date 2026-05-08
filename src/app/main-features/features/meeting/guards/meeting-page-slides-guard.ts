import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { MeetingPageService } from '../services/meeting-page.service';
import { ObservableToPromise } from 'src/app/functions/observeable-to-promise.func';

export const meetingPageSlidesGuard: CanActivateFn = async (route, state) => {

  const service = inject(MeetingPageService)

  await ObservableToPromise(service.$getMeetingPageSlides)

  return true;
};
