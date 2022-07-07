import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { PostJobComponent } from './post-job.component';
import { SharedService } from 'src/app/services/shared.service';
import { AuthService } from 'src/app/services/auth.service';
import { NgSelectModule } from '@ng-select/ng-select';


export const routes: Routes = [
  { path: '', component: PostJobComponent }
];


@NgModule({
  declarations: [PostJobComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    NgSelectModule
  ],
  providers: [AuthService, SharedService]
})
export class PostJobModule { }
