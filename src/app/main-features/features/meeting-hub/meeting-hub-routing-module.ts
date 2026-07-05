import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MeetingHubPageComponent } from './meeting-hub.component';
import { meetingHubGuard } from './guards/meeting-hub-guard';

const routes: Routes = [
  {
    path: "",
    component: MeetingHubPageComponent,
    // canActivate: [meetingHubGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MeetingHubRoutingModule { }
