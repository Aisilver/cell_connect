import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordInputDecoratorComponent } from './password-input-decorator.component';

describe('PasswordInputDecoratorComponent', () => {
  let component: PasswordInputDecoratorComponent;
  let fixture: ComponentFixture<PasswordInputDecoratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasswordInputDecoratorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PasswordInputDecoratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
