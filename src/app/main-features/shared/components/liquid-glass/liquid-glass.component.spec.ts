import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiquidGlassComponent } from './liquid-glass.component';

describe('LiquidGlassComponent', () => {
  let component: LiquidGlassComponent;
  let fixture: ComponentFixture<LiquidGlassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LiquidGlassComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LiquidGlassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
