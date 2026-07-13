import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingSlideOverviewPageComponent } from './meeting-slide-overview-page.component';

describe('MeetingSlideOverviewPageComponent', () => {
  let component: MeetingSlideOverviewPageComponent;
  let fixture: ComponentFixture<MeetingSlideOverviewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeetingSlideOverviewPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeetingSlideOverviewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
