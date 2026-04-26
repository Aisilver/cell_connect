import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSlideViewComponent } from './home-slide-view.component';

describe('HomeSlideViewComponent', () => {
  let component: HomeSlideViewComponent;
  let fixture: ComponentFixture<HomeSlideViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeSlideViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeSlideViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
