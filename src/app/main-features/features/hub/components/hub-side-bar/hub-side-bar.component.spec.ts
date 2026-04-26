import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HubSideBarComponent } from './hub-side-bar.component';

describe('HubSideBarComponent', () => {
  let component: HubSideBarComponent;
  let fixture: ComponentFixture<HubSideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HubSideBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HubSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
