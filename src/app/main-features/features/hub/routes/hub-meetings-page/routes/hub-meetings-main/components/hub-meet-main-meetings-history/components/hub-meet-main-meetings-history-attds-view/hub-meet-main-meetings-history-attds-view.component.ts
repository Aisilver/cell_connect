import { AfterViewInit, Component, inject, Input, signal, ViewChild } from '@angular/core';
import { Attendance, Meeting } from '@shared/entities';
import { ElementsOverlapperComponent } from "src/app/main-features/shared/components/elements-overlapper/elements-overlapper.component";
import { LoadersComponent } from "src/app/main-features/shared/components/loaders/loaders.component";
import { LoaderOptions } from 'src/app/main-features/shared/components/loaders/types';
import { ImageComponent } from "src/app/main-features/shared/components/image/image.component";
import { MeetingsRouteApiCallService } from 'src/app/server/route-services/meetings-route/meetings-route-api-call.service';
import { PaginatedData } from '@shared/common';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hub-meet-main-meetings-history-attds-view',
  imports: [
    CommonModule,
    ElementsOverlapperComponent,
    LoadersComponent,
    ImageComponent
],
  template: `
    <app-loaders [initial_hide]="true" [options]="LoaderOptions">
      <section #loadTarget>
        @if(Attendants().length > 0) {
          <app-elements-overlapper [UnitsLeft]="AttendantsLeft()">
            @for (item of Attendants(); track $index) {
              <div #lap_target [ngClass]="{first: $index == 0}">
                <p>Arrived at: {{item.arrivalTime | date : "hh:mm a"}}</p>

                <app-image [inputSrc]="item.account?.profile_image" default="NO-PROFILE-PHOTO"></app-image>
              </div>
            }
          </app-elements-overlapper>
        }@else {
          <p>No attendees</p>
        }
      </section>
    </app-loaders>
  `,
  styleUrl: './hub-meet-main-meetings-history-attds-view.component.scss'
})
export class HubMeetMainMeetingsHistoryAttdsViewComponent implements AfterViewInit {
  private MeetingApiCall = inject(MeetingsRouteApiCallService)

  @Input()
  Meeting?: Meeting

  LoaderOptions: LoaderOptions = {
    gradient: {
      type: "gray"
    }
  }

  Attendants = signal<Attendance[]>([])

  AttendantsLeft = signal(0)

  @ViewChild(LoadersComponent)
  private loader!: LoadersComponent

  async ngAfterViewInit(): Promise<void> {
    const obvs = this.MeetingApiCall.getMeetingAttendants(this.Meeting?.id ?? 0, 
      {
        exclude_absent: true,
        exclude_user: true,
        exclude_leader: true,
        limit: 4
      }
    ),
    
    response = await this.loader.LoadAsync(obvs)
  
    this.MeetingApiCall.responseChecker(response, data => this.onSuccess(data))
  }

  private onSuccess (paginated_data: PaginatedData<Attendance>) {
    const {data, unitsLeft} = paginated_data

    this.Attendants.update(() => data)

    this.AttendantsLeft.update(() => unitsLeft)
  }
}