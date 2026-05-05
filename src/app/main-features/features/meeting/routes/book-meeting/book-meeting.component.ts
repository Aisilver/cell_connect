import { Component, inject } from '@angular/core';
import { IconComponent } from 'src/app/main-features/shared/components/icon/icon.component';
import { MeetingCreationFormComponent } from 'src/app/main-features/shared/components/meeting-creation-form/meeting-creation-form.component';
import { LoadersComponent } from "src/app/main-features/shared/components/loaders/loaders.component";
import { AppMainService } from 'src/app/general-services/app-main.service';
import { MeetingCreationRequestData } from '@shared/route-types';

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
          <app-icon name="arrow-left"></app-icon>

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

  Back() {
    this.appMainService.routeBack("hub")
  }

  OnMeetingCreate (data: MeetingCreationRequestData) {

  }
}
