import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwirlLoaderComponent } from './swirl-loader.component';

describe('SwirlLoaderComponent', () => {
  let component: SwirlLoaderComponent;
  let fixture: ComponentFixture<SwirlLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwirlLoaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SwirlLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
