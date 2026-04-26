import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HookCalendarComponent } from './hook-calendar.component';

describe('HookCalendarComponent', () => {
  let component: HookCalendarComponent;
  let fixture: ComponentFixture<HookCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HookCalendarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HookCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
