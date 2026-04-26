import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HubBottomBarComponent } from './hub-bottom-bar.component';

describe('HubBottomBarComponent', () => {
  let component: HubBottomBarComponent;
  let fixture: ComponentFixture<HubBottomBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HubBottomBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HubBottomBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
