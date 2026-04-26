import { Component, inject } from '@angular/core';
import { AppMainService } from 'src/app/general-services/app-main.service';
import { IconComponent } from "src/app/main-features/shared/components/icon/icon.component";
import { MeetingCreationFormComponent } from "src/app/main-features/shared/components/meeting-creation-form/meeting-creation-form.component";

@Component({
  selector: 'app-hub-meetins-new-meeting',
  imports: [
    IconComponent,
    MeetingCreationFormComponent
],
  template: `
    <button (click)="Back()">
      <app-icon name="arrow-left"></app-icon>
    
      <h3>New Meeting</h3>
    </button>

    <app-meeting-creation-form></app-meeting-creation-form>
  `,
  styleUrl: './hub-meetings-new-meeting.component.scss'
})
export class HubMeetinsNewMeetingComponent {
  private appMainService = inject(AppMainService)

  Back(){
    this.appMainService.routeBack()
  }
}