import { inject, Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { ObservableToPromise } from 'src/app/functions/observeable-to-promise.func';
import { PagesRouteApiCallService } from 'src/app/server/route-services/pages-route/pages-route-api-call.service';
import { MEETING_PAGE_DEFAULT_SLIDES } from '../injectables/meeting-page-default-slides-data';
import { MeetingPageSlide } from '@shared/entities';

@Injectable({
  providedIn: 'root'
})
export class MeetingPageService {
  private PagesApiCall = inject(PagesRouteApiCallService)

  private DefaultMeetingPagesSlides = inject(MEETING_PAGE_DEFAULT_SLIDES)

  $getMeetingPageSlides = new Observable<MeetingPageSlide[]>(obvs => {

    ObservableToPromise(this.PagesApiCall.getPageSlide("meeting-page-slide"))

    .then(res => this.PagesApiCall.responseChecker(res, 
      
      slides => obvs.next(slides.length > 0 ? (slides as MeetingPageSlide[]) : this.DefaultMeetingPagesSlides),

      () => obvs.next(this.DefaultMeetingPagesSlides)
    ))

    .catch(() => obvs.next(this.DefaultMeetingPagesSlides))

  }).pipe(shareReplay())  
}