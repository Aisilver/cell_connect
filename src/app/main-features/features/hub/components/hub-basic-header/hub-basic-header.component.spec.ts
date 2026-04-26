import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HubBasicHeaderComponent } from './hub-basic-header.component';

describe('HubBasicHeaderComponent', () => {
  let component: HubBasicHeaderComponent;
  let fixture: ComponentFixture<HubBasicHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HubBasicHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HubBasicHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
