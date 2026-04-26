import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DropDownService {
  DropGroupCloseEvent = new Subject<{dropkey: string, groupName?: string}>()
}
