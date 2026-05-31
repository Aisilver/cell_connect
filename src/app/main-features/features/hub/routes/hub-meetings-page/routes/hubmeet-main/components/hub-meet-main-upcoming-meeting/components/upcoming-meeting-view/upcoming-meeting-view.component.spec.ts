import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingMeetingViewComponent } from './upcoming-meeting-view.component';

describe('UpcomingMeetingViewComponent', () => {
  let component: UpcomingMeetingViewComponent;
  let fixture: ComponentFixture<UpcomingMeetingViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpcomingMeetingViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpcomingMeetingViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
