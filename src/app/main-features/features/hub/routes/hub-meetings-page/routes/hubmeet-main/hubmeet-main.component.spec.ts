import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HubmeetMainComponent } from './hubmeet-main.component';

describe('HubmeetMainComponent', () => {
  let component: HubmeetMainComponent;
  let fixture: ComponentFixture<HubmeetMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HubmeetMainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HubmeetMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
