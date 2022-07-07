import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageConstants } from 'src/app/common/message.constants';
import { SystemConstants } from 'src/app/common/system.constants';
import { NotificationService } from 'src/app/services/notification.service';
import { SharedService } from 'src/app/services/shared.service';
import { UploadService } from 'src/app/services/upload.service';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  @ViewChild('avatar') avatar
  infoForm: FormGroup;
  passwordForm: FormGroup;
  cvForm: FormGroup;
  provinceList:any=[];
  user: any;
  id: any;
  postUser: any;
  constructor(private service: SharedService, private uploadService: UploadService, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.id = JSON.parse(localStorage.getItem(SystemConstants.CURRENT_USER)).id
    this.initializeForm();
    this.getUser();
    this.getProvinceList();

  }

  initializeForm(): void {
    this.infoForm = new FormGroup({
      Id: new FormControl(),
      name: new FormControl(''),
      UserName: new FormControl(''),
      Email: new FormControl(''),
      roles: new FormControl([]),
      PhoneNumber: new FormControl('',[Validators.pattern('(([+][(]?[0-9]{1,3}[)]?)|([(]?[0-9]{4}[)]?))\s*[)]?[-\s\.]?[(]?[0-9]{1,3}[)]?([-\s\.]?[0-9]{3})([-\s\.]?[0-9]{3,4})')]),
      description: new FormControl(''),
      avatar: new FormControl(''),
      province_id: new FormControl(),
      address: new FormControl(''),
      status: new FormControl(true)
    });
    this.passwordForm = new FormGroup({
      oldPassword: new FormControl('', Validators.required),
      Password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(32)]),
      rePassword: new FormControl('', Validators.required)
    });
  }
  getUser(): void {
    
    this.service.get('/account/detail/' + this.id).subscribe((response: any) => {
      this.user = response;
      this.infoForm.patchValue({
        Id: this.user.Id,
        name: this.user.name,
        UserName: this.user.UserName,
        roles: this.user.roles,
        Email: this.user.Email,
        description: this.user.description,
        province_id: this.user.province_id,
        avatar: this.user.avatar,
        PhoneNumber: this.user.PhoneNumber,
        address: this.user.address,
        status: this.user.status
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
      this.user = this.infoForm.value;
      let fi = this.avatar.nativeElement;
      if(fi.files.length > 0) {
        this.uploadService.postWithFile('/upload/save-image?type=avatar', null, fi.files)
        .then((imageUrl: string ) => {
          this.user.avatar = imageUrl;
        }).then(() => {
          this.saveChanges();
        })
      } else {
        this.saveChanges()
      }
    }
  } 
  private saveChanges() {

    this.service.put('/account/update', JSON.stringify(this.infoForm.value)).subscribe((response: any) => {
      this.getUser();
      this.notificationService.printSuccessMessage(MessageConstants.UPDATED_OK_MSG);
    }, error => this.service.handleError(error))
  }
}
