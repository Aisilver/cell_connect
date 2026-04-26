import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPodComponent } from './user-pod.component';

describe('UserPodComponent', () => {
  let component: UserPodComponent;
  let fixture: ComponentFixture<UserPodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserPodComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserPodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
