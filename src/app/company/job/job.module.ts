import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination'
import { ManageCompanyJobComponent} from './manage-company-job.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { SharedService } from 'src/app/services/shared.service';


export const routes: Routes = [
  { path: '', component: ManageCompanyJobComponent},
  { path: 'edit-job', loadChildren: () => import('./edit-job/edit-job.module').then(x => x.EditJobModule)},
  { path: 'post-job', loadChildren: () => import('./post-job/post-job.module').then(x => x.PostJobModule)},
  { path: 'registed', loadChildren: () => import('./registed/registed.module').then(x => x.RegistedModule)},
];

@NgModule({
  declarations: [ManageCompanyJobComponent],
  imports: [
    CommonModule,
    PaginationModule,
    FormsModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ],
  providers: [AuthService, SharedService]
})
export class JobModule { }
