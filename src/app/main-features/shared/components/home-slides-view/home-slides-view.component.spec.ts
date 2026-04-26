import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSlidesViewComponent } from './home-slides-view.component';

describe('HomeSlidesViewComponent', () => {
  let component: HomeSlidesViewComponent;
  let fixture: ComponentFixture<HomeSlidesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeSlidesViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeSlidesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
