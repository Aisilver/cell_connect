import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HubMeetingsPageComponent } from './hub-meetings-page.component';
import { HubmeetMainComponent } from './routes/hubmeet-main/hubmeet-main.component';

const routes: Routes = [
  {
    path: "",
    component: HubMeetingsPageComponent,
    children: [
      {
        path: "",
        component: HubmeetMainComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HubMeetingsPageRoutingModule { }
