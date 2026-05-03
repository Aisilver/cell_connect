import { Component, inject, ViewChild } from '@angular/core';
import { AppMainService } from 'src/app/general-services/app-main.service';
import { IconComponent } from "src/app/main-features/shared/components/icon/icon.component";
import { MeetingCreationFormComponent } from "src/app/main-features/shared/components/meeting-creation-form/meeting-creation-form.component";
import { LoadersComponent } from "src/app/main-features/shared/components/loaders/loaders.component";
import { MeetingCreationRequestData } from '@shared/route-types';
import { MeetingsRouteApiCallService } from 'src/app/server/route-services/meetings-route/meetings-route-api-call.service';
import { GCenteredModalsService } from 'src/app/main-features/shared/modals/centered-modals/service/g-centered-modals-service';
import { Meeting } from '@shared/entities';
import { TextDeserailizerPipe } from 'src/app/main-features/shared/pipes/text-deserailizer-pipe';

@Component({
  selector: 'app-hub-meetins-new-meeting',
  imports: [
    IconComponent,
    MeetingCreationFormComponent,
    LoadersComponent
  ],
  providers: [
    {
      provide: TextDeserailizerPipe
    }
  ],
  template: `
    <app-loaders [options]="{'four-circles': {load_text: 'booking meeting', color_theme: 'black'}}">
      <main #loadTarget>
        <button (click)="Back()">
          <app-icon name="arrow-left"></app-icon>

          <h3>New Meeting</h3>
        </button>

        <app-meeting-creation-form (Meeting)="OnMeetingCreated($event)"></app-meeting-creation-form>
      </main>
    </app-loaders>
  `,
  styleUrl: './hub-meetings-new-meeting.component.scss'
})
export class HubMeetinsNewMeetingComponent {
  private appMainService = inject(AppMainService)

  private MeetingApiCall = inject(MeetingsRouteApiCallService)
 
  private GC_Modal = inject(GCenteredModalsService)

  private TextDesentraizer = inject(TextDeserailizerPipe)

  @ViewChild(LoadersComponent)
  private loader!: LoadersComponent

  Back(){
    this.appMainService.routeBack()
  }

  async OnMeetingCreated (data: MeetingCreationRequestData) {
    try {
      const response = await this.loader.LoadAsync(this.MeetingApiCall.bookMeeting(data))
  
      this.MeetingApiCall.responseChecker(response, () => this.onSuccess(data.meeting), () => this.onFail(response.errMessage))
    } catch {
      this.onFail()
    }
  }

  private onSuccess (meeting: Meeting) {
    this.GC_Modal.openDialogue({
      message: `${this.TextDesentraizer.transform(meeting.type)} has been booked successfully`
    }, () => this.Back())
  }

  private onFail (errMessage = "an unknown error has occured while booking meeting") {
    this.GC_Modal.openDialogue({
      title: "failed to book meeting",
      message: errMessage
    })
  }
}