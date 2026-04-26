import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthEVSendOtpComponent } from './signup-e-v-send-otp.component';

describe('AuthEVSendOtpComponent', () => {
  let component: AuthEVSendOtpComponent;
  let fixture: ComponentFixture<AuthEVSendOtpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthEVSendOtpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthEVSendOtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
