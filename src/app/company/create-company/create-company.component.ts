import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SystemConstants } from 'src/app/common/system.constants';
import { URLConstants } from 'src/app/common/url.constants';
import { LoggedInUser } from 'src/app/domain/loggedin.user';
import { SharedService } from 'src/app/services/shared.service';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-create-company',
  templateUrl: './create-company.component.html',
  styleUrls: ['./create-company.component.css']
})
export class CreateCompanyComponent implements OnInit {
  @ViewChild('avatar') avatar
  @ViewChild('banner') banner
  infoForm: FormGroup;
  provinceList:any=[];
  user: LoggedInUser;
  updateUser: any; 
  company: any;
  constructor(private service: SharedService, private uploadService: UploadService, private router:Router) { }

  ngOnInit(): void {
    this.initializeForm()

    this.getProvinceList()
  }
  initializeForm(): void {
    this.user = JSON.parse(localStorage.getItem(SystemConstants.CURRENT_USER))
    this.infoForm = new FormGroup({
      Id: new FormControl(this.user.id),
      name: new FormControl('', Validators.required),
      description: new FormControl(''),
      province_id: new FormControl(Validators.required),
      avatar: new FormControl(''),
      banner: new FormControl(''),
      phone_number: new FormControl(''),
      fax: new FormControl(''),
      address: new FormControl(''),
      status: new FormControl(true)
    });
  }
  
  getProvinceList() {
    this.service.get('/province/get-all').subscribe(data => {
      this.provinceList=data;
    })
  }
  saveData() {
    if(this.infoForm.valid) {
      this.company = this.infoForm.value;
      let lg = this.avatar.nativeElement;
      let bn = this.banner.nativeElement;
      if(lg.files.length > 0 && bn.files.length > 0) {
        this.uploadService.postWithFile('/upload/save-image?type=avatar', null, lg.files)
        .then((imageUrl: string ) => {
          this.company.avatar = imageUrl;
        })
        .then(() => {
          this.uploadService.postWithFile('/upload/save-image?type=avatar', null, bn.files)
          .then((imageUrl: string ) => {
            this.company.banner = imageUrl;
          }).then(() => {
            this.saveChanges()
          })
        })
      } else if(bn.files.length > 0) {
        this.uploadService.postWithFile('/upload/save-image?type=avatar', null, bn.files)
        .then((imageUrl: string ) => {
          this.company.banner = imageUrl;
        }).then(() => {
          this.saveChanges()
        })
      } else if (lg.files.length > 0) {
        this.uploadService.postWithFile('/upload/save-image?type=avatar', null, lg.files)
        .then((imageUrl: string ) => {
          this.company.avatar = imageUrl;
        }).then(() => {
          this.saveChanges()
        })

      } else {
        this.saveChanges()
      }
    }
  }
  saveChanges() {
    this.service.post('/company/add', JSON.stringify(this.infoForm.value)).subscribe((response: any) => {
      this.router.navigateByUrl('/main/job')
    }, error => this.service.handleError(error))

  }
}
