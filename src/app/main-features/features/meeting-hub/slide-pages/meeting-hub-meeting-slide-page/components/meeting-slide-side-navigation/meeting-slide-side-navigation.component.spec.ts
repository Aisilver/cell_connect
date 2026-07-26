import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingSlideSideNavigationComponent } from './meeting-slide-side-navigation.component';

describe('MeetingSlideSideNavigationComponent', () => {
  let component: MeetingSlideSideNavigationComponent;
  let fixture: ComponentFixture<MeetingSlideSideNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeetingSlideSideNavigationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeetingSlideSideNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
