import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeComponent } from './employee.component';
import { EmployeeInfoComponent } from './employee-info/employee-info.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { employeeRoutes } from './employee.route';
import { AuthService } from 'src/app/services/auth.service';
import { SharedService } from 'src/app/services/shared.service';


@NgModule({
  declarations: [
    EmployeeComponent,
    EmployeeInfoComponent
    
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(employeeRoutes),
    BsDropdownModule,
    NgSelectModule, 
    PaginationModule,
    FormsModule
  ],
  providers:[
    AuthService, SharedService
  ]
})
export class EmployeeModule { }
