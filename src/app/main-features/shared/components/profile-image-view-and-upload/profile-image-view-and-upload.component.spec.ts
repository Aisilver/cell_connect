import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileImageViewAndUploadComponent } from './profile-image-view-and-upload.component';

describe('ProfileImageViewAndUploadComponent', () => {
  let component: ProfileImageViewAndUploadComponent;
  let fixture: ComponentFixture<ProfileImageViewAndUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileImageViewAndUploadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileImageViewAndUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
