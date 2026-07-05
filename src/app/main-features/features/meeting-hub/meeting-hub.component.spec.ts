import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingHubPageComponent } from './meeting-hub.component';

describe('MeetingHubComponent', () => {
  let component: MeetingHubPageComponent;
  let fixture: ComponentFixture<MeetingHubPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeetingHubPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeetingHubPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
