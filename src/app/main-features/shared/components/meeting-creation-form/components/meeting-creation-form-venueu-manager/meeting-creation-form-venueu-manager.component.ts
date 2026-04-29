import { AfterViewInit, Component, inject, Input, signal, ViewChild } from '@angular/core';
import { LoadersComponent } from "../../../loaders/loaders.component";
import { MeetingsRouteApiCallService } from 'src/app/server/route-services/meetings-route/meetings-route-api-call.service';
import { AppLocation } from '@shared/entities';

@Component({
  selector: 'app-meeting-creation-form-venueu-manager',
  imports: [LoadersComponent],
  templateUrl: './meeting-creation-form-venueu-manager.component.html',
  styleUrl: './meeting-creation-form-venueu-manager.component.scss'
})
export class MeetingCreationFormVenueuManagerComponent implements AfterViewInit {
  private MeetingApiCall = inject(MeetingsRouteApiCallService)

  DefaultVenue = signal<AppLocation | null>(null)

  @Input()
  Mode!: "edit" | "create"

  @ViewChild(LoadersComponent)
  private loader!: LoadersComponent

  UseDifferentVenue = signal(false)

  ngAfterViewInit(): void {
    
  }
}