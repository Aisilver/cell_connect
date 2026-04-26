import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementsOverlapperComponent } from './elements-overlapper.component';

describe('ElementsOverlapperComponent', () => {
  let component: ElementsOverlapperComponent;
  let fixture: ComponentFixture<ElementsOverlapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElementsOverlapperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElementsOverlapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
