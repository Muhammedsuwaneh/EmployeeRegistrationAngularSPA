import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { EmployeesComponentComponent } from './components/employees-component/employees-component.component';
import { EmployeesFormComponentComponent } from './components/employees-form-component/employees-form-component.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponentComponent,
    EmployeesFormComponentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
