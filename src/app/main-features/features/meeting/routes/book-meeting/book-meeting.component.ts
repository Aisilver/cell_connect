import { Component, inject, ViewChild } from '@angular/core';
import { IconComponent } from 'src/app/main-features/shared/components/icon/icon.component';
import { MeetingCreationFormComponent } from 'src/app/main-features/shared/components/meeting-creation-form/meeting-creation-form.component';
import { LoadersComponent } from "src/app/main-features/shared/components/loaders/loaders.component";
import { AppMainService } from 'src/app/general-services/app-main.service';
import { MeetingCreationRequestData } from '@shared/route-types';
import { MeetingsRouteApiCallService } from 'src/app/server/route-services/meetings-route/meetings-route-api-call.service';
import { GCenteredModalsService } from 'src/app/main-features/shared/modals/centered-modals/service/g-centered-modals-service';

@Component({
  selector: 'app-book-meeting',
  imports: [
    IconComponent,
    MeetingCreationFormComponent,
    LoadersComponent
],
  template: `
    <app-loaders [options]="{'four-circles': {load_text: 'booking meeting'}}">
      <main #loadTarget>
        <header>
          <app-icon name="arrow-left" (click)="Back()"></app-icon>

            <div>
              <h3>Book Meeting</h3>
              <p>Book a meeting for your members.</p>
            </div>
        </header>

        <app-meeting-creation-form Mode="create" (Meeting)="OnMeetingCreate($event)"></app-meeting-creation-form>
      </main>
    </app-loaders>
  `,
  styleUrl: './book-meeting.component.scss'
})
export class BookMeetingComponent {
  private appMainService = inject(AppMainService)

  private MeetingApiCall = inject(MeetingsRouteApiCallService)

  private GC_Modal = inject(GCenteredModalsService)

  @ViewChild(LoadersComponent)
  private loader!: LoadersComponent

  Back() {
    this.appMainService.routeBack("hub")
  }

  OnMeetingCreate (data: MeetingCreationRequestData) {
    this.loader.Load(this.MeetingApiCall.bookMeeting(data),
    
    res => this.MeetingApiCall.responseChecker(res, ()=> this.OnSuccess(), () => this.OnFail(res.errMessage)),
    
    undefined,
  
    () => this.OnFail())
  }

  private OnSuccess () {
    this.GC_Modal.openDialogue({
      type: "success",
      message: "meeting has been booked successfully"
    })

    this.Back()
  }

  private OnFail (errMessage = "an unknown error occured"){
    this.GC_Modal.openDialogue({
      message: errMessage,
      type: "alert",
      title: "failed to book meeting"
    })
  }
}
