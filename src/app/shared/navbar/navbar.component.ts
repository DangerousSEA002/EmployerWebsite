import { Component, OnInit } from '@angular/core';
import { SystemConstants } from 'src/app/common/system.constants';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  provinceList: any=[];
  selectedProvince: any;
  constructor(private utilityService: UtilityService) { }

  ngOnInit(): void {
  }
  logout() {
    localStorage.removeItem(SystemConstants.CURRENT_USER);
    this.utilityService.navigateToLogin();
  }
}
