import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HubMeetMainMeetingsHistoryAttdsViewComponent } from './hub-meet-main-meetings-history-attds-view.component';

describe('HubMeetMainMeetingsHistoryAttdsViewComponent', () => {
  let component: HubMeetMainMeetingsHistoryAttdsViewComponent;
  let fixture: ComponentFixture<HubMeetMainMeetingsHistoryAttdsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HubMeetMainMeetingsHistoryAttdsViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HubMeetMainMeetingsHistoryAttdsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
