import { AfterViewInit, Component, inject, Input, signal, ViewChild } from '@angular/core';
import { LoadersComponent } from "../../../loaders/loaders.component";
import { MeetingsRouteApiCallService } from 'src/app/server/route-services/meetings-route/meetings-route-api-call.service';
import { AppLocation, List } from '@shared/entities';
import { ApiResponse } from '@shared/common';
import { UserService } from 'src/app/general-services/user-service';
import { AppRouteApiCallService } from 'src/app/server/route-services/app-route/app-route-api-call.service';
import { DropDownComponent } from "../../../drop-down/drop-down.component";
import { IconComponent } from "../../../icon/icon.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { APP_LOCATION_MODEL } from 'src/app/models/app-location-model/app-location-model';
import { TextDeserailizerPipe } from 'src/app/main-features/shared/pipes/text-deserailizer-pipe';
import { InputFieldDecoratorComponent } from "src/app/main-features/shared/decorators/input-field-decorator/input-field-decorator.component";

@Component({
  selector: 'app-meeting-creation-form-venueu-manager',
  imports: [
    CommonModule,
    FormsModule,
    LoadersComponent,
    DropDownComponent,
    IconComponent,
    TextDeserailizerPipe,
    InputFieldDecoratorComponent
],
  templateUrl: './meeting-creation-form-venueu-manager.component.html',
  styleUrl: './meeting-creation-form-venueu-manager.component.scss'
})
export class MeetingCreationFormVenueuManagerComponent {
  private userService = inject(UserService)

  private MeetingApiCall = inject(MeetingsRouteApiCallService)

  private AppApiCall = inject(AppRouteApiCallService)

  DefaultVenue = signal<AppLocation | null | undefined>(null)

  NewVenue = inject(APP_LOCATION_MODEL).getModel()

  UseDifferentVenue = signal(true)

  IsOk = signal(false)

  @Input()
  Mode!: "edit" | "create"

  @Input()
  ExternalLocation?: AppLocation

  @ViewChild("DefaultVenueLoader")
  private DefaultVenueLoader!: LoadersComponent

  @ViewChild("CitiesLoader")
  private CitiesLoader!: LoadersComponent

  @ViewChild(DropDownComponent)
  private CitiesDropDown!: DropDownComponent

  UseDiffVenue () {
    this.UseDifferentVenue.update(() => true)
  }

  OnDefaultVenueLoaderReady(): void {
    if(this.Mode == 'create')
      this.DefaultVenueLoader.Load(this.MeetingApiCall.getMeetingDefaultVenue(this.userService.Cell_ID), response => this.OnDefaultVenueResponse(response))
    else
      this.DefaultVenue.update(() => this.ExternalLocation)
  }

  OnCitiesLoaderReady () {
    this.CitiesLoader.Load(this.AppApiCall.getCities(), response => this.OnCitiesResponse(response))
  }

  OnCitySelect(slug: string){
    this.NewVenue.city = slug
  }

  private OnCitiesResponse (res: ApiResponse<List[]>){
    const {data} = res

    if(!this.AppApiCall.responseChecker(res)) return

    const units = data.map(li => {
      return {
        key: li.slug
      }
    })

    this.CitiesDropDown.LoadDropUnits(units)

    this.CitiesDropDown.SelectKey(units.at(0)?.key)
  }

  private OnDefaultVenueResponse (res: ApiResponse<AppLocation>){
    const {data: venue} = res

    if(!this.MeetingApiCall.responseChecker(res)) return

    this.DefaultVenue.update(() => venue)
  }
}