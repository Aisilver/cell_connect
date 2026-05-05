import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookedMeetingSlidesManagerComponent } from './meeting-page-slides-manager.component';

describe('BookedMeetingSlidesManagerComponent', () => {
  let component: BookedMeetingSlidesManagerComponent;
  let fixture: ComponentFixture<BookedMeetingSlidesManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookedMeetingSlidesManagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookedMeetingSlidesManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
