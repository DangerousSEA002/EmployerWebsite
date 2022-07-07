import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ForgotPasswordComponent } from './company/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './company/change-password/change-password.component';
import { TosComponent } from './website/tos/tos.component';
import { SecurityComponent } from './website/security/security.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import {HttpClientModule} from '@angular/common/http';
import { AuthGuard } from './guard/auth.guard';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.route';

@NgModule({
  declarations: [
    AppComponent,
    ForgotPasswordComponent,
    ChangePasswordComponent,
    TosComponent,
    SecurityComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
