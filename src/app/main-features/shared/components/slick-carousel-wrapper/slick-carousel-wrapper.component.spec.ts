import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlickCarouselWrapperComponent } from './slick-carousel-wrapper.component';

describe('SlickCarouselWrapperComponent', () => {
  let component: SlickCarouselWrapperComponent;
  let fixture: ComponentFixture<SlickCarouselWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SlickCarouselWrapperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlickCarouselWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
