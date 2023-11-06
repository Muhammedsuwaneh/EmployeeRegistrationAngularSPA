import { Injectable } from '@angular/core';
import { IEmployee } from 'src/app/interfaces/interfaces';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EmployeesServiceService {

  baseURL = ""; 
  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': 'GET,POST,DELETE,HEAD,PUT,OPTIONS',
      'Access-Control-Allow-Headers': 'GET,POST,DELETE,HEAD,PUT,OPTIONS',
      'Access-Control-Allow-Methods': 'GET,POST,DELETE,HEAD,PUT,OPTIONS',
      'Content-Type': 'application/json',
    })
  };

  constructor(private http: HttpClient) { }

  getEmployeeList = () : Observable<Object> => {
    return this.http.get(this.baseURL+"/employees.json");
  }

  addEmployee = (employee: IEmployee) : Observable<Object> => {
    return this.http.post(this.baseURL+"/employees.json", employee, this.httpOptions);
  }

  deleteEmployee = (id: string): Observable<Object> => {
    return this.http.delete(`${this.baseURL}/employees/${id}.json`, this.httpOptions);
  }

  updateEmployeeInfo(employee: IEmployee, key: string) : Observable<Object> {
      return this.http.put(`${this.baseURL}/employees/${key}.json`, employee, this.httpOptions);
  }
}
