import { Component, inject, OnInit } from '@angular/core';
import { LoadersComponent } from "src/app/main-features/shared/components/loaders/loaders.component";
import { IconComponent } from "src/app/main-features/shared/components/icon/icon.component";
import { EditMeetingInfoService } from './services/edit-meeting-info.service';
import { CommonModule } from '@angular/common';
import { MeetingCreationFormComponent } from "src/app/main-features/shared/components/meeting-creation-form/meeting-creation-form.component";
import { MeetingPageService } from '../../services/meeting-page.service';
import { Meeting, MeetingEditLog } from '@shared/entities';
import { MeetingCreationRequestData } from '@shared/route-types';

@Component({
  selector: 'app-edit-meeting',
  imports: [
    CommonModule,
    LoadersComponent,
    IconComponent,
    MeetingCreationFormComponent
  ],
  template: `
    <app-loaders>
      <main #loadTarget>
        <nav>
          <app-icon class="back" name="arrow-left"></app-icon>

          <app-icon [ngClass]="{pulse: !ViewedInfo}" class="info" (click)="ViewInfo()" name="info-circle"></app-icon>
        </nav>

        <header>
          <h3>Edit Meeting</h3>

          <p>Make changes to your meeting here.</p>
        </header>

        <app-meeting-creation-form Mode="edit" [ExternalMeeting]="MeetngToBeEdited" (Meeting_Edited)="OnChangesMade($event)"></app-meeting-creation-form>
      </main>
    </app-loaders>
  `,
  styleUrl: './edit-meeting.component.scss'
})
export class EditMeetingComponent {
  private service = inject(MeetingPageService)

  private infoService = inject(EditMeetingInfoService)

  get ViewedInfo () {
    return this.infoService.UserHasViewdInfo
  }

  get MeetngToBeEdited () {
    return this.service.getMeetingToEdit()
  }

  ViewInfo () {
    this.infoService.viewEditMeeetingInfo()
  }

  OnChangesMade (data: {meeting: Meeting, editLog?: MeetingEditLog | null}) {

  }
}