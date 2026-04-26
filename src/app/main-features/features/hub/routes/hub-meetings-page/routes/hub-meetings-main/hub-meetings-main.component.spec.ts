import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HubMeetingsMainComponent } from './hub-meetings-main.component';

describe('HubMeetingsMainComponent', () => {
  let component: HubMeetingsMainComponent;
  let fixture: ComponentFixture<HubMeetingsMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HubMeetingsMainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HubMeetingsMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
