import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistedComponent } from './registed.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'index' },
  { path: 'index/:id', component: RegistedComponent}
];

@NgModule({
  declarations: [
    RegistedComponent
  ],
  imports: [
    CommonModule,
    PaginationModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class RegistedModule { }
