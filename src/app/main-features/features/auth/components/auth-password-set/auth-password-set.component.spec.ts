import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthPasswordSetComponent } from './auth-password-set.component';

describe('AuthPasswordSetComponent', () => {
  let component: AuthPasswordSetComponent;
  let fixture: ComponentFixture<AuthPasswordSetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthPasswordSetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthPasswordSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
