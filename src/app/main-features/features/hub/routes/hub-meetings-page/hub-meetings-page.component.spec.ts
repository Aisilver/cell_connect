import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HubMeetingsPageComponent } from './hub-meetings-page.component';

describe('HubMeetingsPageComponent', () => {
  let component: HubMeetingsPageComponent;
  let fixture: ComponentFixture<HubMeetingsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HubMeetingsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HubMeetingsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
