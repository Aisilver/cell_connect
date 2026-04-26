import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HubDashboardPageComponent } from './hub-dashboard-page.component';

describe('HubDashboardPageComponent', () => {
  let component: HubDashboardPageComponent;
  let fixture: ComponentFixture<HubDashboardPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HubDashboardPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HubDashboardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
