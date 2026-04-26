import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingAgendaViewComponent } from './meeting-agenda-view.component';

describe('MeetingAgendaViewComponent', () => {
  let component: MeetingAgendaViewComponent;
  let fixture: ComponentFixture<MeetingAgendaViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeetingAgendaViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeetingAgendaViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
