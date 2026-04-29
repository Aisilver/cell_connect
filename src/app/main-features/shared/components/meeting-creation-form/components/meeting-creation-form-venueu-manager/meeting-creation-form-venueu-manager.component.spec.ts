import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingCreationFormVenueuManagerComponent } from './meeting-creation-form-venueu-manager.component';

describe('MeetingCreationFormVenueuManagerComponent', () => {
  let component: MeetingCreationFormVenueuManagerComponent;
  let fixture: ComponentFixture<MeetingCreationFormVenueuManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeetingCreationFormVenueuManagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeetingCreationFormVenueuManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
