import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingCreationFormTimeValidatorComponent } from './meeting-creation-form-time-validator.component';

describe('MeetingCreationFormTimeValidatorComponent', () => {
  let component: MeetingCreationFormTimeValidatorComponent;
  let fixture: ComponentFixture<MeetingCreationFormTimeValidatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeetingCreationFormTimeValidatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeetingCreationFormTimeValidatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
