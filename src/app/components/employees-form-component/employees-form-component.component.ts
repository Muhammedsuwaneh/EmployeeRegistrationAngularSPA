import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subscription } from 'rxjs';
import { IEmployee } from 'src/app/interfaces/interfaces';
import { EmployeesServiceService } from 'src/app/services/employees-service.service';
import { v4 as uuidv4 } from 'uuid';
import { EmployeesComponentComponent } from '../employees-component/employees-component.component';

@Component({
    selector: 'app-employees-form-component',
    templateUrl: './employees-form-component.component.html',
    styleUrls: ['./employees-form-component.component.css'],
    providers: [EmployeesServiceService]
})
export class EmployeesFormComponentComponent implements OnInit, OnDestroy {

    employees: any[] = [];
    form!: FormGroup;
    formMode: string = "new";
    private employeeSubscription!: Subscription;
    @ViewChild(EmployeesComponentComponent) employeeTableComponent: any;

    constructor(private employeeService: EmployeesServiceService, private fb: FormBuilder) {
      this.form = this.fb.group({
        employeeId: [''],
        employeeKey: [''],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        phoneNumber: ['', Validators.required],
        salary: ['', Validators.required],
        role: ['', Validators.required],
        email: ['', [Validators.required]]
      });
    }

    get isButtonDisabled(): boolean {
      return this.formMode !== "new";
    }

    addEmployee = () : void => {
      if(this.form.valid) {
        const employee: IEmployee = {
          id: uuidv4(),
          firstName: this.form.value.firstName,
          lastName: this.form.value.lastName,
          email: this.form.value.email,
          phoneNumber: this.form.value.phoneNumber,
          role: this.form.value.role,
          salary: this.form.value.salary
        };

        this.employeeService.addEmployee(employee).subscribe({
            next: (res: any) => {
              this.employees = [...this.employees, { key: res["name"], value: employee }];
            },
            error: (err) => console.log("oops: " + err.message),
            complete: () => {
              this.clearInputFields();
            }
        })
      }
      else alert("oops something went wrong");
    }

    updateEmployee = (form: FormGroup) => {
      if(this.form.valid) {
        const employee: IEmployee = {
          id: this.form.value.employeeId,
          firstName: this.form.value.firstName,
          lastName: this.form.value.lastName,
          email: this.form.value.email,
          phoneNumber: this.form.value.phoneNumber,
          role: this.form.value.role,
          salary: this.form.value.salary
        };

        this.employeeService.updateEmployeeInfo(employee, this.form.value.employeeKey).subscribe({
          next: (res) => {
            this.employees.map((_employee) => {
              if(_employee.key === this.form.value.employeeKey) {
                _employee.value = employee;
              }
              return _employee;
            })
          },
          error: (err) => console.log("oops: " + err),
          complete: () => console.log("done ...")
        })
      }
    }

    clearInputFields = () => {
      this.form.reset();
      this.formMode = "new";
    };

    onEmployeeDelete = (id: string) => {
      this.employees = this.employees.filter((em) => em.key != id);
    };

    loadFormInputFieldsWithData = (employee: any) => {
        this.formMode = "update"; // set form state
        const formValues = {
          firstName: employee.value.firstName,
          lastName: employee.value.lastName,
          email: employee.value.email,
          phoneNumber: employee.value.phoneNumber,
          role: employee.value.role,
          salary: employee.value.salary,
          employeeKey: employee.key
        };

        console.log(formValues)
        this.form.patchValue(formValues);
    }

    getEmployeeInfo = (data: any) => {
      let items: { key: string, value: any } [] = [];
      for(const key in data) {
        if(data.hasOwnProperty(key)) {
          items.push({ key: key, value: data[key] })
        }
      }
      this.employees = items;
    }

    ngOnDestroy(): void {
      if(this.employeeSubscription) this.employeeSubscription.unsubscribe();
    }

    ngOnInit() {
      this.employeeSubscription = this.employeeService.getEmployeeList().subscribe({
        next: (res: any) => {
          this.getEmployeeInfo(res);
        },
        error: (err) => console.log("oops something went wrong - " + err),
        complete: () => console.log("done ...")
      })
    }
}
