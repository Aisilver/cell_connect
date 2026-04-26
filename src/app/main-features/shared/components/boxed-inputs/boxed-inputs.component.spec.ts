import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxedInputsComponent } from './boxed-inputs.component';

describe('BoxedInputsComponent', () => {
  let component: BoxedInputsComponent;
  let fixture: ComponentFixture<BoxedInputsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoxedInputsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoxedInputsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
