import { Injectable, inject } from '@angular/core';
import { AuthPageSlide } from '@shared/entities';
import { Observable, shareReplay } from 'rxjs';
import { ObservableToPromise } from 'src/app/functions/observeable-to-promise.func';
import { DEFAULT_AUTH_PAGE_SLIDES } from 'src/app/main-features/features/auth/injectables/default-auth-page-slide-data';
import { PagesRouteApiCallService } from 'src/app/server/route-services/pages-route/pages-route-api-call.service';

@Injectable({
  providedIn: 'root'
})
export class AuthSlidesService {
  private PagesApiCall = inject(PagesRouteApiCallService)

  private DefaultAuthPageSlides = inject(DEFAULT_AUTH_PAGE_SLIDES)

  $getAuthSlides = new Observable<AuthPageSlide[]>( obvs => {
    ObservableToPromise(this.PagesApiCall.getPageSlide("auth-page-slide"))
    
    .then(res => {
      this.PagesApiCall.responseChecker(res, 
        
        data => obvs.next(data.length < 1 ? this.DefaultAuthPageSlides : data as AuthPageSlide[]),

        () => obvs.next(this.DefaultAuthPageSlides)
      )
    })
    
    .catch(() => obvs.next(this.DefaultAuthPageSlides))

  }).pipe(shareReplay())  
}