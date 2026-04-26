import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { PagesRouteApiCallService } from '../../../../server/route-services/pages-route/pages-route-api-call.service';
import { ObservableToPromise } from '../../../../functions/observeable-to-promise.func';
import { HomeService } from '../services/home.service';

export const loadHomeSlidesGuard: CanActivateFn = async (route, state) => {
    const pagesApiCall = inject(PagesRouteApiCallService),

    homeService = inject(HomeService)

    try {
    
      const response = await ObservableToPromise(pagesApiCall.getHomeSlides())
    
      homeService.setSlides(response.data)
      
    } catch {}

  return true;
};
