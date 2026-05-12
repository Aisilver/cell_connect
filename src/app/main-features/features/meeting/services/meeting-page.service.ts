import { inject, Injectable } from '@angular/core';
import { firstValueFrom, Observable, shareReplay } from 'rxjs';
import { PagesRouteApiCallService } from 'src/app/server/route-services/pages-route/pages-route-api-call.service';
import { MEETING_PAGE_DEFAULT_SLIDES } from '../injectables/meeting-page-default-slides-data';
import { Meeting, MeetingPageSlide } from '@shared/entities';
import { MEETING_MODEL } from 'src/app/models/meeting-model/meeting-model';

@Injectable({
  providedIn: 'root'
})
export class MeetingPageService {
  private PagesApiCall = inject(PagesRouteApiCallService)

  private DefaultMeetingPagesSlides = inject(MEETING_PAGE_DEFAULT_SLIDES)

  private MeetingModal = inject(MEETING_MODEL)

  private declare MeetingToEdit: Meeting | null

  $getMeetingPageSlides = new Observable<MeetingPageSlide[]>(obvs => {

    firstValueFrom(this.PagesApiCall.getPageSlide("meeting-page-slide"))

    .then(res => this.PagesApiCall.responseChecker(res, 
      
      slides => obvs.next(slides.length > 0 ? (slides as MeetingPageSlide[]) : this.DefaultMeetingPagesSlides),

      () => obvs.next(this.DefaultMeetingPagesSlides)
    ))

    .catch(() => obvs.next(this.DefaultMeetingPagesSlides))

  }).pipe(shareReplay())

  setMeetingToEdit (meeting: Meeting) {
    this.MeetingToEdit = meeting
  }

  getMeetingToEdit () {
    // if(!this.MeetingToEdit) throw Error("meeting to edit was not set")

    return this.MeetingModal.getDummyModel()
  }
}