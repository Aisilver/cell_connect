import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MeetingRoutingModule } from './meeting-routing-module';
import { MeetingComponent } from './meeting.component';
import { MeetingPageSlidesManagerComponent } from './components/meeting-page-slides-manager/meeting-page-slides-manager.component';
import { BubbleWrpperComponent } from "../../shared/components/bubble-wrpper/bubble-wrpper.component";


@NgModule({
  declarations: [
    MeetingComponent
  ],
  imports: [
    CommonModule,
    MeetingRoutingModule,
    MeetingPageSlidesManagerComponent,
    BubbleWrpperComponent
]
})
export class MeetingModule { }
