import { AfterViewInit, Component, DoCheck, ElementRef } from '@angular/core';
import { AllChildDOMElementFlexer } from 'src/app/functions/all-child-flexer.func';

@Component({
  selector: 'app-hub-meetings-main',
  standalone: false,
  template: `
    <router-outlet></router-outlet>
  `
})
export class HubMeetingsPageComponent implements DoCheck, AfterViewInit {
  constructor(private componentElement: ElementRef) {}

  ngAfterViewInit(): void {
    AllChildDOMElementFlexer(this.componentElement.nativeElement, ['router-outlet'])
  }

  ngDoCheck(): void {
    AllChildDOMElementFlexer(this.componentElement.nativeElement, ['router-outlet'])
  }
}