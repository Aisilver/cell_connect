import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HubMeetingsPageRoutingModule } from './hub-meetings-page-routing-module';
import { HubMeetingsPageComponent } from './hub-meetings-page.component';


@NgModule({
  declarations: [
    HubMeetingsPageComponent
  ],
  imports: [
    CommonModule,
    HubMeetingsPageRoutingModule
  ]
})
export class HubMeetingsPageModule { }
