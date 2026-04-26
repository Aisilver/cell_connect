import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDialogue } from './confirm-dialogue.component';

describe('ConfirmDialogue', () => {
  let component: ConfirmDialogue;
  let fixture: ComponentFixture<ConfirmDialogue>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmDialogue]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmDialogue);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
