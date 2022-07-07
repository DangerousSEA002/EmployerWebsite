import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageConstants } from 'src/app/common/message.constants';
import { SystemConstants } from 'src/app/common/system.constants';
import { URLConstants } from 'src/app/common/url.constants';
import { LoggedInUser } from 'src/app/domain/loggedin.user';
import { NotificationService } from 'src/app/services/notification.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-manage-company-job',
  templateUrl: './manage-company-job.component.html',
  styleUrls: ['./manage-company-job.component.css']
})
export class ManageCompanyJobComponent implements OnInit {

  @ViewChild('modalAddEdit', {static: false})
  addEditForm: FormGroup;
  jobForm: FormGroup;
  isSideBarOpen: boolean;
  pageElement: HTMLElement;
  jobList: any = [];
  job: any;
  pageIndex: number = 1;
  pageSize: number = 10;
  pageDisplay: number = 10;
  totalRow: number;
  user: LoggedInUser;
  keyword: string = '';
  company: any;
  constructor(private service: SharedService, private notificationService: NotificationService, private router:Router,
    ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.user = JSON.parse(localStorage.getItem(SystemConstants.CURRENT_USER))
    this.loadData();

  }
  ngAfterViewInit(): void {
      this.pageElement = document.querySelector<HTMLElement>('.page');
  }

  initializeForm() {
    this.jobForm = new FormGroup({
      name: new FormControl('')
    });
  }
  pageChanged(event: any): void {
    this.pageIndex = event.page;
    this.loadData();
  }
  loadData() {
    this.service.get('/job/get-all-paging-by-company-id/' + this.user.id + '?page=' + this.pageIndex + '&pageSize=' + this.pageSize)
      .subscribe((response: any) => {
        this.jobList = response.Items;
        this.pageIndex = response.PageIndex;
        this.pageSize = response.PageSize;
        this.totalRow = response.TotalRows;
      })
    this.service.get('/company/detail/' + this.user.id)
      .subscribe((response: any) => {
        this.company = response
        if(this.company === null) {
          this.router.navigate([URLConstants.CREATE_COMPANY])
        }
    })
  }
  navigateToEdit(id: any) {
    this.router.navigateByUrl('/main/job/edit-job/' + id);
  }
  navigateToViewRegisted(id: any) {
    this.router.navigateByUrl('/main/job/registed/' + id);
  }
  deleteItem(id: any) {
    this.notificationService.printConfirmationDialog(MessageConstants.CONFIRM_DELETE_MSG, ()=> {
      this.deleteItemConfirm(id);
    })
  }
  deleteItemConfirm(id: any) {
    this.service.delete('/job/delete', 'id', id).subscribe((response: Response)=>{
      this.notificationService.printSuccessMessage(MessageConstants.DELETE_OK_MSG);
      this.loadData();
    })
  }
  sendjob(id: any) {
    this.notificationService.printConfirmationDialog(MessageConstants.PUBLIC_JOB_MSG, ()=> {
      this.sendJobConfirm(id);
    })
  }  
  sendJobConfirm(id: any) {
    this.service.put('/job/send-job?id=' + id).subscribe((response: Response)=>{
      this.notificationService.printSuccessMessage(MessageConstants.PUBLIC_JOB_OK_MSG);
      this.loadData();
    })
  }
  unpublicJob(id: any) {
    this.notificationService.printConfirmationDialog(MessageConstants.UNPUBLIC_JOB_MSG, ()=> {
      this.unpublicJobConfirm(id);
    })
  }  
  unpublicJobConfirm(id: any) {
    this.service.put('/job/unpublic-job?id=' + id).subscribe((response: Response)=>{
      this.notificationService.printSuccessMessage(MessageConstants.UNPUBLIC_JOB_OK_MSG);
      this.loadData();
    })
  }
}

