import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HubNavBarComponent } from './hub-nav-bar.component';

describe('HubNavBarComponent', () => {
  let component: HubNavBarComponent;
  let fixture: ComponentFixture<HubNavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HubNavBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HubNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
