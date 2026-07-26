import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingSlideBottomNavigationComponent } from './meeting-slide-bottom-navigation.component';

describe('MeetingSlideBottomNavigationComponent', () => {
  let component: MeetingSlideBottomNavigationComponent;
  let fixture: ComponentFixture<MeetingSlideBottomNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeetingSlideBottomNavigationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeetingSlideBottomNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
