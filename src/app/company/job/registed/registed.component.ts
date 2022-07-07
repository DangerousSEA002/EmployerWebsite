import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SystemConstants } from 'src/app/common/system.constants';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-registed',
  templateUrl: './registed.component.html',
  styleUrls: ['./registed.component.css']
})
export class RegistedComponent implements OnInit {
  registedForm: FormGroup;
  registedUsers: any = [];
  pageIndex: number = 1;
  pageSize: number = 10;
  pageDisplay: number = 10;
  totalRow: number;
  id: any;
  server: string;
  constructor(private service: SharedService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(prM => { 
      const id = +prM.get('id');
      this.id = id;
      this.loadData();
    });
    this.server = SystemConstants.BASE_SERVER
    this.initializeForm();
  }
  pageChanged(event: any): void {
    this.pageIndex = event.page;
    this.loadData();
  }
  loadData() {
    this.service.get('/job/get-all-registed-paging-by-job-id/' + this.id + '?page=' + this.pageIndex + '&pageSize=' + this.pageSize)
      .subscribe((response: any) => {
        this.registedUsers = response.Items;
        this.pageIndex = response.PageIndex;
        this.pageSize = response.PageSize;
        this.totalRow = response.TotalRows;
      })
  }
  initializeForm() {
    this.registedForm = new FormGroup({
      name: new FormControl('')
    })
  }
}
