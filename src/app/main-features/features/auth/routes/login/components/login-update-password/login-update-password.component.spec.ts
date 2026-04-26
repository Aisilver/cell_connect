import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginUpdatePasswordComponent } from './login-update-password.component';

describe('LoginUpdatePasswordComponent', () => {
  let component: LoginUpdatePasswordComponent;
  let fixture: ComponentFixture<LoginUpdatePasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginUpdatePasswordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginUpdatePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
