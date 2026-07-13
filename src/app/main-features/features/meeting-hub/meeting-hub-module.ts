import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MeetingHubRoutingModule } from './meeting-hub-routing-module';
import { MeetingHubPageComponent } from './meeting-hub.component';
import { BubbleWrpperComponent } from "../../shared/components/bubble-wrpper/bubble-wrpper.component";
import { IconComponent } from "../../shared/components/icon/icon.component";
import { SlickCarouselWrapperComponent } from "../../shared/components/slick-carousel-wrapper/slick-carousel-wrapper.component";
import { MeetingHubMeetingSlidePageComponent } from "./slide-pages/meeting-hub-meeting-slide-page/meeting-hub-meeting-slide-page.component";
import { MeetingHubBroadcastSlidePageComponent } from "./slide-pages/meeting-hub-broadcast-slide-page/meeting-hub-broadcast-slide-page.component";
import { MeetingHubLobbySlidePageComponent } from "./slide-pages/meeting-hub-lobby-slide-page/meeting-hub-lobby-slide-page.component";


@NgModule({
  declarations: [
    MeetingHubPageComponent
  ],
  imports: [
    CommonModule,
    MeetingHubRoutingModule,
    BubbleWrpperComponent,
    IconComponent,
    SlickCarouselWrapperComponent,
    MeetingHubMeetingSlidePageComponent,
    MeetingHubBroadcastSlidePageComponent,
    MeetingHubLobbySlidePageComponent
]
})
export class MeetingHubModule { }
