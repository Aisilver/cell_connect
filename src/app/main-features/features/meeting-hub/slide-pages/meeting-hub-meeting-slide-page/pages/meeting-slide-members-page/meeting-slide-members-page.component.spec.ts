import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingSlideMembersPageComponent } from './meeting-slide-members-page.component';

describe('MeetingSlideMembersPageComponent', () => {
  let component: MeetingSlideMembersPageComponent;
  let fixture: ComponentFixture<MeetingSlideMembersPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeetingSlideMembersPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeetingSlideMembersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
