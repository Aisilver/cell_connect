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
  `,
  styleUrl: './edit-meeting-info-modal.component.scss'
})
export class EditMeetingInfoModalComponent extends ModalEntity {
  private appmainService = inject(AppMainService)

  @Input("modal-service")
  protected override modalgenerator!: ModalGenerator;

  get MaxEditChances () {
    const {max_meeting_edit_chances} = this.appmainService.APP_SETTINGS.meeting_settings

    return max_meeting_edit_chances
  }
}
