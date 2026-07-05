import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingHubMeetingSlidePageComponent } from './meeting-hub-meeting-slide-page.component';

describe('MeetingHubMeetingSlidePageComponent', () => {
  let component: MeetingHubMeetingSlidePageComponent;
  let fixture: ComponentFixture<MeetingHubMeetingSlidePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeetingHubMeetingSlidePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeetingHubMeetingSlidePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
