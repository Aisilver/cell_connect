import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SIgnUpLocationComponent } from './sign-up-location.component';

describe('SIgnUpLocationComponent', () => {
  let component: SIgnUpLocationComponent;
  let fixture: ComponentFixture<SIgnUpLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SIgnUpLocationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SIgnUpLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
