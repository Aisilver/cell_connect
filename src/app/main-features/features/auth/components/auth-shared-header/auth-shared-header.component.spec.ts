import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthSharedHeaderComponent } from './auth-shared-header.component';

describe('AuthSharedHeaderComponent', () => {
  let component: AuthSharedHeaderComponent;
  let fixture: ComponentFixture<AuthSharedHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthSharedHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthSharedHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
