import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HUB_ROUTES } from './hub.routes';


@NgModule({
  imports: [RouterModule.forChild(HUB_ROUTES)],
  exports: [RouterModule]
})
export class HubRoutingModule { }
