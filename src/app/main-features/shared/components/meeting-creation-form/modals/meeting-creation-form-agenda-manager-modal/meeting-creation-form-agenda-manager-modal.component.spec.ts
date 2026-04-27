import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingCreationFormAgendaManagerModalComponent } from './meeting-creation-form-agenda-manager-modal.component';

describe('MeetingCreationFormAgendaManagerModalComponent', () => {
  let component: MeetingCreationFormAgendaManagerModalComponent;
  let fixture: ComponentFixture<MeetingCreationFormAgendaManagerModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeetingCreationFormAgendaManagerModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeetingCreationFormAgendaManagerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
