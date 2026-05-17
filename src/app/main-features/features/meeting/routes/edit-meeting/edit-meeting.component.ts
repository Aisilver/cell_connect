import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { LoadersComponent } from "src/app/main-features/shared/components/loaders/loaders.component";
import { IconComponent } from "src/app/main-features/shared/components/icon/icon.component";
import { EditMeetingInfoService } from './services/edit-meeting-info.service';
import { CommonModule } from '@angular/common';
import { MeetingCreationFormComponent } from "src/app/main-features/shared/components/meeting-creation-form/meeting-creation-form.component";
import { MeetingPageService } from '../../services/meeting-page.service';
import { Meeting, MeetingEditLog } from '@shared/entities';
import { CloneOf } from 'src/app/functions/clone-of.func';
import { AppMainService } from 'src/app/general-services/app-main.service';
import { subHours } from 'date-fns';
import { MeetingsRouteApiCallService } from 'src/app/server/route-services/meetings-route/meetings-route-api-call.service';
import { MeetingEditRequestData } from '@shared/route-types';
import { ApiResponse } from '@shared/common';
import { GCenteredModalsService } from 'src/app/main-features/shared/modals/centered-modals/service/g-centered-modals-service';

@Component({
  selector: 'app-edit-meeting',
  imports: [
    CommonModule,
    LoadersComponent,
    IconComponent,
    MeetingCreationFormComponent
  ],
  template: `
    <app-loaders [options]="{'four-circles': {color_theme: 'black', load_text: 'saving changes'}}">
      <main #loadTarget>
        <nav>
          <app-icon name="arrow-left" (click)="Back()"></app-icon>

          <app-icon [ngClass]="{pulse: !ViewedInfo}" class="info" (click)="ViewInfo()" name="info-circle"></app-icon>
        </nav>

        <header>
          <h3>Edit Meeting</h3>

          <p>Make changes to your meeting here.</p>
        </header>

        <section class="info-box">
          <p>You currently have <b>{{EditsLeft}}</b> edits remaining.</p>

          <p>Meeting edits will close after <b>{{EditDeadline | date : "hh:mm aa"}}</b>.</p>
        </section>

        <app-meeting-creation-form Mode="edit" [ExternalMeeting]="MeetngToBeEdited" (Meeting_Edited)="OnChangesMade($event)"></app-meeting-creation-form>
      </main>
    </app-loaders>
  `,
  styleUrl: './edit-meeting.component.scss'
})
export class EditMeetingComponent {
  private service = inject(MeetingPageService)

  private infoService = inject(EditMeetingInfoService)

  private appMainService = inject(AppMainService)

  private MeetingApiCall = inject(MeetingsRouteApiCallService)

  private GC_Modal = inject(GCenteredModalsService)

  @ViewChild(LoadersComponent)
  private loader!: LoadersComponent

  get G_MeetingSettings () {
    return this.appMainService.APP_SETTINGS.meeting_settings
  }

  get ViewedInfo () {
    return this.infoService.UserHasViewdInfo
  }

  get MeetngToBeEdited () {
    return CloneOf(this.service.getMeetingToEdit())
  }

  get EditsLeft () {
    const {max_meeting_edit_chances} = this.G_MeetingSettings,
    
    {editLogs} = this.MeetngToBeEdited

    if(!editLogs) return max_meeting_edit_chances

    return Math.max(max_meeting_edit_chances - editLogs.length, 0)
  }

  get EditDeadline () {
    const {startTime} = this.MeetngToBeEdited,

    {max_meeting_editable_deadline_hours} = this.G_MeetingSettings

    return subHours(startTime, max_meeting_editable_deadline_hours)
  }

  Back () {
    this.appMainService.routeBack("hub")
  }

  ViewInfo () {
    this.infoService.viewEditMeeetingInfo()
  }

  OnChangesMade (edit_data: {new_meeting: Meeting, editLog: MeetingEditLog}) {
    const {editLog, new_meeting} = edit_data,

    meetingId = this.MeetngToBeEdited.id ?? 0,

    editRequest: MeetingEditRequestData = {
      oldMeeting: this.MeetngToBeEdited,
      editLog,
      newMeeting: new_meeting,
    }

    this.loader.Load(this.MeetingApiCall.editMeeting(meetingId, editRequest), 
      res => this.OnResponse(res), 

      undefined, 

      () => this.OnFail()
    )
  }

  private OnResponse (response: ApiResponse){
    if(this.MeetingApiCall.responseChecker(response))
      this.GC_Modal.openDialogue({
        type: "success",
        message: "changes have been made successfully"
      }, () => this.Back())
    else 
      this.OnFail(response.errMessage)
  }

  private OnFail(errMessage = "an unexpected error occured, pls try again later") {
    this.GC_Modal.openDialogue({
      type: "alert",
      message: errMessage
    })
  }
}