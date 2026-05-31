import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HubmeetMeetingDetailsComponent } from './hubmeet-meeting-details.component';

describe('HubmeetMeetingDetailsComponent', () => {
  let component: HubmeetMeetingDetailsComponent;
  let fixture: ComponentFixture<HubmeetMeetingDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HubmeetMeetingDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HubmeetMeetingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
