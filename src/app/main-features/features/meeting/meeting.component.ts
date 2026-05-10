import { AfterViewInit, Component, DoCheck, ElementRef, ViewChild } from '@angular/core';
import { AllChildDOMElementFlexer } from 'src/app/functions/all-child-flexer.func';

@Component({
  selector: 'app-meeting-page',
  standalone: false,
  template: `
    <app-bubble-wrapper>
      <main>
        <section #section>
          <router-outlet></router-outlet>      
        </section>
        <app-meeting-page-slides-manager class="slide-manager"></app-meeting-page-slides-manager>
      </main>
    </app-bubble-wrapper>
  `,
  styleUrl: './meeting.component.scss'
})
export class MeetingComponent implements DoCheck, AfterViewInit {
  @ViewChild('section', {static: true})
  private sectionDomRef!: ElementRef<HTMLElement>

  ngDoCheck(): void {
    if(this.sectionDomRef)
      AllChildDOMElementFlexer(this.sectionDomRef.nativeElement, ['router-outlet'])
  }

  ngAfterViewInit(): void {
    AllChildDOMElementFlexer(this.sectionDomRef.nativeElement, ['router-outlet'])
  }
}