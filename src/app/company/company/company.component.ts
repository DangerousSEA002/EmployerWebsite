import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageConstants } from 'src/app/common/message.constants';
import { SystemConstants } from 'src/app/common/system.constants';
import { NotificationService } from 'src/app/services/notification.service';
import { SharedService } from 'src/app/services/shared.service';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  @ViewChild('avatar') avatar
  @ViewChild('banner') banner
  infoForm: FormGroup;
  provinceList:any=[];
  company: any;
  id: any;
  constructor(private service: SharedService, private uploadService: UploadService, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.initializeForm()
    this.getCompany()
    this.getProvinceList()
  }
  initializeForm(): void {
    this.infoForm = new FormGroup({
      Id: new FormControl(),
      name: new FormControl('', Validators.required),
      description: new FormControl(''),
      province_id: new FormControl(),
      address: new FormControl(''),
      avatar: new FormControl(''),
      banner: new FormControl(''),
      fax: new FormControl(''),
      phone_number: new FormControl(''),
      status: new FormControl(true)
    });
  }
  getCompany(): void {
    this.id = JSON.parse(localStorage.getItem(SystemConstants.CURRENT_USER)).id
    this.service.get('/company/detail/' + this.id).subscribe((response: any) => {
      this.company = response;
      this.infoForm.patchValue({
        Id: this.company.Id,
        name: this.company.name,
        description: this.company.description,
        province_id: this.company.province_id,
        avatar: this.company.avatar,
        banner: this.company.banner,
        phone_number: this.company.phone_number,
        fax: this.company.fax,
        address: this.company.address,
      });
    })
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
    this.service.put('/company/update', JSON.stringify(this.infoForm.value)).subscribe((response: any) => {
      this.notificationService.printSuccessMessage(MessageConstants.UPDATED_OK_MSG)
    }, error => this.service.handleError(error))
  }
}
