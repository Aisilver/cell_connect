import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { ObservableToPromise } from '../../../../functions/observeable-to-promise.func';
import { HomeService } from '../services/home.service';

export const loadHomeSlidesGuard: CanActivateFn = async (route, state) => {
  const homeService = inject(HomeService)

  await ObservableToPromise(homeService.$getHomePageSlides)

  return true;
};
