import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { IEmployee } from 'src/app/interfaces/interfaces';
import { EmployeesServiceService } from 'src/app/services/employees-service.service';

@Component({
  selector: 'app-employees-component',
  templateUrl: './employees-component.component.html',
  styleUrls: ['./employees-component.component.css']
})
export class EmployeesComponentComponent {
  @Input() employees: any[] = [];
  @Output() EditEmployeeInfoEvent: EventEmitter<any> = new EventEmitter();
  @Output() DeleteEmployeeInfoEvent: EventEmitter<any> = new EventEmitter();

  constructor(private employeeService: EmployeesServiceService) {}

  editEmployeeInfo = (id: string) => {
    if(id) {
      const employee = this.employees.find((item) => item.key === id);
      if(employee) {
        this.EditEmployeeInfoEvent.emit(employee);
      }
      else console.log("employee not found");
    }
  }

  deleteEmployee(id: string) : void {
    if(id) this.employeeService.deleteEmployee(id).subscribe({
      next: (res) => {
        this.DeleteEmployeeInfoEvent.emit(id);
        console.log("deleted");
      },
      error: (err) => console.log("oops something went wrong"),
      complete: () => console.log("done")
    });
  }
}
