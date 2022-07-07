import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { mainRoutes } from './main.routes';
import { UtilityService } from '../services/utility.service';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { MainComponent } from './main.component';



@NgModule({
  declarations: [NavbarComponent, FooterComponent, MainComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(mainRoutes),

  ],
  providers: [    UtilityService, AuthService, NotificationService]
})
export class MainModule { }
