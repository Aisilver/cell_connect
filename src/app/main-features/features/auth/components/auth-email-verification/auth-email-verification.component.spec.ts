import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthEmailVerificationComponent } from './sign-up-email-verification.component';

describe('AuthEmailVerificationComponent', () => {
  let component: AuthEmailVerificationComponent;
  let fixture: ComponentFixture<AuthEmailVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthEmailVerificationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthEmailVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
