import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthTogglePanelComponent } from './auth-toggle-panel.component';

describe('AuthTogglePanelComponent', () => {
  let component: AuthTogglePanelComponent;
  let fixture: ComponentFixture<AuthTogglePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthTogglePanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthTogglePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
