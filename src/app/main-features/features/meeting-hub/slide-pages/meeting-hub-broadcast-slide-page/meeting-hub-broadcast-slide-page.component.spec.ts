import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingHubBroadcastSlidePageComponent } from './meeting-hub-broadcast-slide-page.component';

describe('MeetingHubBroadcastSlidePageComponent', () => {
  let component: MeetingHubBroadcastSlidePageComponent;
  let fixture: ComponentFixture<MeetingHubBroadcastSlidePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeetingHubBroadcastSlidePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeetingHubBroadcastSlidePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
