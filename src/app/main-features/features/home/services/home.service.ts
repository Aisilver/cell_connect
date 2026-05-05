import { inject, Injectable } from '@angular/core';
import { HomePageSlide } from '@shared/entities';
import { DEFAULT_HOME_PAGE_SLIDE } from '../injectables/default-home-page-slide-data';
import { PagesRouteApiCallService } from 'src/app/server/route-services/pages-route/pages-route-api-call.service';
import { Observable, shareReplay } from 'rxjs';
import { ObservableToPromise } from 'src/app/functions/observeable-to-promise.func';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private PagesApiCall = inject(PagesRouteApiCallService)

  private defaultSlide: HomePageSlide = inject(DEFAULT_HOME_PAGE_SLIDE)

  $getHomePageSlides = new Observable<HomePageSlide[]>(obvs => {
    ObservableToPromise(this.PagesApiCall.getPageSlide("home-page-slide"))

    .then(res => {
      this.PagesApiCall.responseChecker(res, 

        data => obvs.next(data.length < 1 ? [this.defaultSlide] : data as HomePageSlide[]),

        () => obvs.next([this.defaultSlide])
      )
    })

    .catch(() => obvs.next([this.defaultSlide]))

  }).pipe(shareReplay())
}
