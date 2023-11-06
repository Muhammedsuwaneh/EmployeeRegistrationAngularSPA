import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesFormComponentComponent } from './employees-form-component.component';

describe('EmployeesFormComponentComponent', () => {
  let component: EmployeesFormComponentComponent;
  let fixture: ComponentFixture<EmployeesFormComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeesFormComponentComponent]
    });
    fixture = TestBed.createComponent(EmployeesFormComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
