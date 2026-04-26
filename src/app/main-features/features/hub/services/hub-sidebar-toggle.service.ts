import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'any'
})
export class HubSidebarToggleService {
  SideBarToggleState = new BehaviorSubject<"open" | "close">("close")
}
