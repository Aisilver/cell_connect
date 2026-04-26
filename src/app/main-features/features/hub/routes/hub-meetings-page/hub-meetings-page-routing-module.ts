import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HUB_MEETINGS_ROUTES } from './hub-meetings.routes';

@NgModule({
  imports: [RouterModule.forChild(HUB_MEETINGS_ROUTES)],
  exports: [RouterModule]
})
export class HubMeetingsPageRoutingModule { }
