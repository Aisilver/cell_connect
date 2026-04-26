import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FourCirclesLoaderComponent } from './four-circles-loader.component';

describe('FourCirclesLoaderComponent', () => {
  let component: FourCirclesLoaderComponent;
  let fixture: ComponentFixture<FourCirclesLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FourCirclesLoaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FourCirclesLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
