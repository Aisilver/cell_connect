import { AfterViewInit, Component, DoCheck, ElementRef, inject } from '@angular/core';
import { AllChildDOMElementFlexer } from 'src/app/functions/all-child-flexer.func';

@Component({
  selector: 'app-hub-meetings-page',
  standalone: false,
  template: `
    <router-outlet></router-outlet>
  `
})
export class HubMeetingsPageComponent implements AfterViewInit, DoCheck {
  private componentElement = inject(ElementRef).nativeElement

  ngAfterViewInit(): void {
    AllChildDOMElementFlexer(this.componentElement, [
      "router-outlet"
    ])
  }

  ngDoCheck(): void {
    AllChildDOMElementFlexer(this.componentElement, [
      "router-outlet"
    ])
  }
}