import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginForgotPasswordEmailComponent } from './login-forgot-password-email.component';

describe('LoginForgotPasswordEmailComponent', () => {
  let component: LoginForgotPasswordEmailComponent;
  let fixture: ComponentFixture<LoginForgotPasswordEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginForgotPasswordEmailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginForgotPasswordEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
