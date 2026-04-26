import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HUB_ROUTES } from './hub.routes';


@NgModule({
  imports: [RouterModule.forChild(HUB_ROUTES)],
  exports: [RouterModule]
})
export class HubRoutingModule { }
