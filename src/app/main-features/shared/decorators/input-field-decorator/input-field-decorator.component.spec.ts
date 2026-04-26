import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputFieldDecoratorComponent } from './input-field-decorator.component';

describe('InputFieldDecoratorComponent', () => {
  let component: InputFieldDecoratorComponent;
  let fixture: ComponentFixture<InputFieldDecoratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputFieldDecoratorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputFieldDecoratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
