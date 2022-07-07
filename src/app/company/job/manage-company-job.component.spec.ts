import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCompanyJobComponent } from './manage-company-job.component';

describe('ManageCompanyJobComponent', () => {
  let component: ManageCompanyJobComponent;
  let fixture: ComponentFixture<ManageCompanyJobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageCompanyJobComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageCompanyJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
