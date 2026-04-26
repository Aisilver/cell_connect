import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneNumberFieldDecoratorComponent } from './phone-number-field-decorator.component';

describe('PhoneNumberFieldDecoratorComponent', () => {
  let component: PhoneNumberFieldDecoratorComponent;
  let fixture: ComponentFixture<PhoneNumberFieldDecoratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhoneNumberFieldDecoratorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhoneNumberFieldDecoratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
