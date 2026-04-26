import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BubbleWrpperComponent } from './bubble-wrpper.component';

describe('BubbleWrpperComponent', () => {
  let component: BubbleWrpperComponent;
  let fixture: ComponentFixture<BubbleWrpperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BubbleWrpperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BubbleWrpperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
