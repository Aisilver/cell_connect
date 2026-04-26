import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HubMeetinsNewMeetingComponent } from './hub-meetings-new-meeting.component';

describe('HubMeetinsNewMeetingComponent', () => {
  let component: HubMeetinsNewMeetingComponent;
  let fixture: ComponentFixture<HubMeetinsNewMeetingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HubMeetinsNewMeetingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HubMeetinsNewMeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
