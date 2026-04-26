import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckBoxDecoratorComponent } from './check-box-decorator.component';

describe('CheckBoxDecoratorComponent', () => {
  let component: CheckBoxDecoratorComponent;
  let fixture: ComponentFixture<CheckBoxDecoratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckBoxDecoratorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckBoxDecoratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
