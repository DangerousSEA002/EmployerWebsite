import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SystemConstants } from 'src/app/common/system.constants';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  employeeList: any={}
  keyword='';
  pageIndex: number = 1;
  pageSize: number = 10;
  pageDisplay: number = 10;
  totalRow: number;
  imgUrl = SystemConstants.BASE_SERVER
  constructor(private service: SharedService, private router:Router) { }

  ngOnInit(): void {
    this.initializeForm();
    this.getEmployeeList();
  }
  getEmployeeList() {
    this.service.get('/account/get-all-employee?filter=' + this.keyword + '&page=' + this.pageIndex + '&pageSize=' + this.pageSize)
      .subscribe((response: any) => {
        this.employeeList = response.Items;
        this.pageIndex = response.PageIndex;
        this.pageSize = response.PageSize;
        this.totalRow = response.TotalRows;
      })
  }
  navigateToEmployee(id) {
    this.router.navigateByUrl('/main/employee/employee-info/' + id);
  }
  pageChanged(event: any): void {
    this.pageIndex = event.page;
    this.getEmployeeList();
  }
  initializeForm() {
    this.employeeForm = new FormGroup({
      name: new FormControl('')
    });
  }
}
