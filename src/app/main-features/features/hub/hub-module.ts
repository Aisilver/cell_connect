import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HubRoutingModule } from './hub-routing-module';
import { HubComponent } from './hub.component';
import { BubbleWrpperComponent } from "../../shared/components/bubble-wrpper/bubble-wrpper.component";
import { HubSideBarComponent } from "./components/hub-side-bar/hub-side-bar.component";
import { HubBottomBarComponent } from "./components/hub-bottom-bar/hub-bottom-bar.component";
import { HubNavBarComponent } from "./components/hub-nav-bar/hub-nav-bar.component";


@NgModule({
  declarations: [
    HubComponent
  ],
  imports: [
    CommonModule,
    HubRoutingModule,
    BubbleWrpperComponent,
    HubSideBarComponent,
    HubBottomBarComponent,
    HubNavBarComponent
],
  schemas: [NO_ERRORS_SCHEMA]
})
export class HubModule { }
