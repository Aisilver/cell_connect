import { Component, inject, Input } from '@angular/core';
import { AppMainService } from 'src/app/general-services/app-main.service';
import { ModalEntity } from 'src/app/general-services/modals-service/classes/modal-entity.class';
import { ModalGenerator } from 'src/app/general-services/modals-service/classes/modal-generator.class';

@Component({
  selector: 'app-edit-meeting-info-modal',
  imports: [],
  template: `
    <h3>Edit Chances</h3>

    <p>
        You can only edit this meeting a 
        limited number of times to help maintain accuracy and consistency for attendees. 
        To avoid frequent changes, meetings can only be edited <b>{{MaxEditChances}}</b> times.
    </p>

    <div class="line"></div>

    <h3>Edit Deadline</h3>

    <p>
      To avoid last minute changes and inconvinence to attendees, meetings won't be editable
      from <b>{{EditDeadeLineHours}}</b> hours to when the meeting is ment to start.
    </p>
  `,
  styleUrl: './edit-meeting-info-modal.component.scss'
})
export class EditMeetingInfoModalComponent extends ModalEntity {
  private appmainService = inject(AppMainService)

  @Input("modal-service")
  protected override modalgenerator!: ModalGenerator;

  private get G_MeetingSettings () {
    return this.appmainService.APP_SETTINGS.meeting_settings
  }

  get MaxEditChances () {
    return this.G_MeetingSettings.max_meeting_edit_chances
  }

  get EditDeadeLineHours () {
    return this.G_MeetingSettings.max_meeting_editable_deadline_hours
  }
}
