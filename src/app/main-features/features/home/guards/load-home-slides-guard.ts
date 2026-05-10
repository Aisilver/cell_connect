import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { HomeService } from '../services/home.service';
import { firstValueFrom } from 'rxjs';

export const loadHomeSlidesGuard: CanActivateFn = async (route, state) => {
  const homeService = inject(HomeService)

  await firstValueFrom(homeService.$getHomePageSlides)

  return true;
};
