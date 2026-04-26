import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlitterComponent } from './glitter.component';

describe('GlitterComponent', () => {
  let component: GlitterComponent;
  let fixture: ComponentFixture<GlitterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlitterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlitterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
