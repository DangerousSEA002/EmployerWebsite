import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageConstants } from 'src/app/common/message.constants';
import { SystemConstants } from 'src/app/common/system.constants';
import { URLConstants } from 'src/app/common/url.constants';
import { LoggedInUser } from 'src/app/domain/loggedin.user';
import { NotificationService } from 'src/app/services/notification.service';
import { SharedService } from 'src/app/services/shared.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-post-job',
  templateUrl: './post-job.component.html',
  styleUrls: ['./post-job.component.css']
})
export class PostJobComponent implements OnInit {
  colorTheme = 'dark-blue';
  infoForm: FormGroup;
  provinceList:any=[];
  levelList:any=[];
  workingTypeList: any=[];
  welfareTypeList: any=[];
  salaryRangeList: any=[];
  job: any={};
  categoryList: any =[];
  user: LoggedInUser;
  welfares: any=[];
  constructor(private service: SharedService, private notificationService: NotificationService,
    private utilityService: UtilityService, private router: Router) { }

  ngOnInit(): void {
    this.initializeForm();
    this.getProvinceList();
    this.getLevelList();
    this.getSalaryList();
    this.getWorkingTypeList();
    this.getWelfareTypeList();
    this.getCategoryList();
    this.user = JSON.parse(localStorage.getItem(SystemConstants.CURRENT_USER))

  }

  initializeForm(): void {
    this.infoForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl(),
      province_id: new FormControl(),
      level_id: new FormControl(),
      Id: new FormControl(),
      job_requirement: new FormControl(),
      working_type_id: new FormControl(),
      welfares: new FormArray([
        new FormGroup({
          welfare_type: new FormControl(),
          description: new FormControl(''),
        })
      ]),
      salary_range_id: new FormControl(),
      job_categories: new FormControl([]),
      address: new FormControl('')
    });
    this.welfares= this.infoForm.get('welfares') as FormArray;
  }
  addWelfares() {
    if(this.welfares.length < 3) {
      const control =  new FormGroup({
        welfare_type: new FormControl(),
        description: new FormControl(''),
      });
      this.welfares.push(control);
    }
  }
  removeWelfares(index: number) {
    this.welfares.removeAt(index);
  }
  getProvinceList() {
    this.service.get('/province/get-all/').subscribe(data => {
      this.provinceList=data;
    })
  }
  getLevelList(){
    this.service.get('/level/get-all').subscribe(data => {
      this.levelList=data;
    })
  }
  getWorkingTypeList(){
    this.service.get('/working-type/get-all').subscribe(data => {
      this.workingTypeList=data;
    })
  }
  getWelfareTypeList(){
    this.service.get('/welfare-type/get-all').subscribe(data => {
      this.welfareTypeList=data;
    })
  }
  getSalaryList(){
    this.service.get('/salary-range/get-all').subscribe(data => {
      this.salaryRangeList=data;
    })
  }
  getCategoryList(){
    this.service.get('/category/get-all').subscribe(data => {
      this.categoryList=data;
    })
  }

  saveChanges(valid: boolean) {
    if(valid) {
        this.job = this.infoForm.value;
        this.job.Id = this.user.id;
        this.job.seo_alias = this.utilityService.MakeSeoTitle(this.infoForm.controls['name'].value);
        this.service.post('/job/add', JSON.stringify(this.job)).subscribe((response: any) => {
          this.job = response;
          this.notificationService.printSuccessMessage(MessageConstants.CREATED_OK_MSG);
          this.router.navigate([URLConstants.HOME])
        }, error => this.service.handleError(error))
    }
  }
}
