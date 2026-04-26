import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing-module';
import { AuthComponent } from './auth.component';
import { ImageComponent } from "../../shared/components/image/image.component";
import { BubbleWrpperComponent } from "../../shared/components/bubble-wrpper/bubble-wrpper.component";
import { AuthTogglePanelComponent } from "./components/auth-toggle-panel/auth-toggle-panel.component";


@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ImageComponent,
    BubbleWrpperComponent,
    AuthTogglePanelComponent
]
})
export class AuthModule { }
