import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageConstants } from 'src/app/common/message.constants';
import { LoggedInUser } from 'src/app/domain/loggedin.user';
import { NotificationService } from 'src/app/services/notification.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-edit-job',
  templateUrl: './edit-job.component.html',
  styleUrls: ['./edit-job.component.css']
})
export class EditJobComponent implements OnInit {
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
  jobCategories: any=[];
  welfares: any=[];
  constructor(private service: SharedService, private notificationService: NotificationService,private router:Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.initializeForm()
    this.route.paramMap.subscribe(prM => { 
      const id = +prM.get('id');
      this.getJob(id)
    });
  }
  getJob(id: number) {
    this.welfares= this.infoForm.get('welfares') as FormArray;
    this.service.get('/job/get-welfares/' + id).subscribe((response: any) => {
      this.service.get('/welfare-type/get-all').subscribe(data => {
        this.welfareTypeList=data;
        for(let item of response) {
          let welfareType = this.welfareTypeList.find(x=> x.welfare_type_id === item.welfare_type_id)
          this.welfares.push(new FormGroup({
            description: new FormControl(item.description),
            welfare_type: new FormControl(welfareType),
          }))
        }
      })
    })
    this.service.get('/job/get-categories/' + id).subscribe((response: any) => {
      this.service.get('/category/get-all').subscribe(data => {
        this.categoryList=data;
        for(let item of response) {
          this.jobCategories.push(this.categoryList.find(x=> x.category_id == item.category_id))
        }
        this.infoForm.patchValue({
          job_categories: this.jobCategories
        })
      })
    })
    this.service.get('/job/detail/' + id).subscribe((response: any) => {
      this.job = response;
      this.service.get('/province/get-all/').subscribe(data => {
        this.provinceList=data;
      })
      this.service.get('/level/get-all').subscribe(data => {
        this.levelList=data;
      })
      this.service.get('/working-type/get-all').subscribe(data => {
        this.workingTypeList=data;
      })
      this.service.get('/salary-range/get-all').subscribe(data => {
        this.salaryRangeList=data;
      })
      this.infoForm.patchValue({
        job_id: this.job.job_id,
        name: this.job.name,
        description: this.job.description,
        province_id: this.job.province_id,
        seo_alias: this.job.seo_alias,
        level_id: this.job.level_id,
        working_type_id: this.job.working_type_id,
        welfare_type_id: this.job.welfare_type_id,
        salary_range_id: this.job.salary_range_id,
        job_end_date: this.job.job_end_date,
        job_view_count: this.job.job_view_count,
        job_requirement: this.job.job_requirement,
        address:this.job.address,
        status: this.job.status,
        created_at: this.job.created_at,
        Id: this.job.Id
      })
    })
  }
  initializeForm(): void {
    this.infoForm = new FormGroup({
      job_id: new FormControl(),
      Id: new FormControl(),
      name: new FormControl('', Validators.required),
      description: new FormControl(),
      seo_alias: new FormControl(),
      province_id: new FormControl(),
      level_id: new FormControl(),
      working_type_id: new FormControl(),
      salary_range_id: new FormControl(),
      welfares: new FormArray([]),
      job_categories: new FormControl([]),
      address: new FormControl(''),
      status: new FormControl(),
      job_end_date: new FormControl(),
      job_view_count: new FormControl(),
      job_requirement: new FormControl(),
      created_at: new FormControl(),
    });
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
    if(this.welfares.length > 1) {
      this.welfares.removeAt(index);
    }
  }

  saveChanges(valid: boolean) {
    if(valid) {
      this.service.put('/job/update', JSON.stringify(this.infoForm.value)).subscribe((response: any) => {
        this.job = response;
        this.notificationService.printSuccessMessage(MessageConstants.UPDATED_OK_MSG);
        this.router.navigateByUrl('/main/job');
      }, error => this.service.handleError(error))
    }
  }
}
