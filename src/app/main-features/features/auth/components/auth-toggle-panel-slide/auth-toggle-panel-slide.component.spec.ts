import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthTogglePanelSlideComponent } from './auth-toggle-panel-slide.component';

describe('AuthTogglePanelSlideComponent', () => {
  let component: AuthTogglePanelSlideComponent;
  let fixture: ComponentFixture<AuthTogglePanelSlideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthTogglePanelSlideComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthTogglePanelSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
