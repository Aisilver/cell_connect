import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMeetingInfoModalComponent } from './edit-meeting-info-modal.component';

describe('EditMeetingInfoModalComponent', () => {
  let component: EditMeetingInfoModalComponent;
  let fixture: ComponentFixture<EditMeetingInfoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditMeetingInfoModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditMeetingInfoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
