import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HubMeetMainMeetingsHistoryMobileRowViewComponent } from './hub-meet-main-meetings-history-mobile-row-view.component';

describe('HubMeetMainMeetingsHistoryMobileRowViewComponent', () => {
  let component: HubMeetMainMeetingsHistoryMobileRowViewComponent;
  let fixture: ComponentFixture<HubMeetMainMeetingsHistoryMobileRowViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HubMeetMainMeetingsHistoryMobileRowViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HubMeetMainMeetingsHistoryMobileRowViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
