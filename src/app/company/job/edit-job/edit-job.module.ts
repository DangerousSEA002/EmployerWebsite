import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditJobComponent } from './edit-job.component';
import { RouterModule, Routes } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { SharedService } from 'src/app/services/shared.service';

export const routes: Routes = [
  { path: '', redirectTo: 'index' },
  { path: 'index/:id', component: EditJobComponent}
];


@NgModule({
  declarations: [
    EditJobComponent
  ],
  imports: [
    CommonModule,
    NgSelectModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ],
  providers: [AuthService, SharedService]
})
export class EditJobModule { }
