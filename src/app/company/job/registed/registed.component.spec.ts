import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistedComponent } from './registed.component';

describe('RegistedComponent', () => {
  let component: RegistedComponent;
  let fixture: ComponentFixture<RegistedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
