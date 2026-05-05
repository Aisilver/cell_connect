import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MeetingComponent } from './meeting.component';
import { bookMeetingGuard } from './guards/book-meeting-guard';
import { BookMeetingComponent } from './routes/book-meeting/book-meeting.component';
import { EditMeetingComponent } from './routes/edit-meeting/edit-meeting.component';
import { editMeetingGuard } from './guards/edit-meeting-guard';

const routes: Routes = [
  {
    path: "",
    component: MeetingComponent,
    children: [
      {
        path: "",
        component: BookMeetingComponent,
        canActivate: [bookMeetingGuard]
      },

      {
        path: "edit/:meetingId",
        component: EditMeetingComponent,
        canActivate: [editMeetingGuard]
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MeetingRoutingModule { }
