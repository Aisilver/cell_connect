import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'any'
})
export class HubNavBarToggleService {
  NavbarToggleState = new BehaviorSubject<"opened" | "closed">("opened")
}