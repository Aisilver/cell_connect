import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingCreationFormComponent } from './meeting-creation-form.component';

describe('MeetingCreationFormComponent', () => {
  let component: MeetingCreationFormComponent;
  let fixture: ComponentFixture<MeetingCreationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeetingCreationFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeetingCreationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
