import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpBioComponent } from './sign-up-bio.component';

describe('SignUpBioComponent', () => {
  let component: SignUpBioComponent;
  let fixture: ComponentFixture<SignUpBioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignUpBioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignUpBioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
