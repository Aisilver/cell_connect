import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthEVValidateOtpComponent } from './signup-e-v-validate-otp.component';

describe('AuthEVValidateOtpComponent', () => {
  let component: AuthEVValidateOtpComponent;
  let fixture: ComponentFixture<AuthEVValidateOtpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthEVValidateOtpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthEVValidateOtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
