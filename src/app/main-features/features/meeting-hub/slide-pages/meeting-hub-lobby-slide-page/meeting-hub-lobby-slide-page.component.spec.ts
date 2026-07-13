import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingHubLobbySlidePageComponent } from './meeting-hub-lobby-slide-page.component';

describe('MeetingHubLobbySlidePageComponent', () => {
  let component: MeetingHubLobbySlidePageComponent;
  let fixture: ComponentFixture<MeetingHubLobbySlidePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeetingHubLobbySlidePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeetingHubLobbySlidePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
