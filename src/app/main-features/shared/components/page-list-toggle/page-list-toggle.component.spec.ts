import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageListToggleComponent } from './page-list-toggle.component';

describe('PageListToggleComponent', () => {
  let component: PageListToggleComponent;
  let fixture: ComponentFixture<PageListToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageListToggleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageListToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
