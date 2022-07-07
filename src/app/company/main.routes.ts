import { Routes } from '@angular/router';
import { MainComponent } from './main.component';

export const mainRoutes: Routes = [
    {path: '', component: MainComponent, children: [
        //localhost:4200/main
        { path: '', redirectTo: 'job', pathMatch: 'full' },
        //localhost:4200/main/home
        { path: 'job', loadChildren: () => import('./job/job.module').then(x => x.JobModule) },
        { path: 'account', loadChildren: () => import('./account/account.module').then(x => x.AccountModule) },
        { path: 'forgot-password', loadChildren: () => import('./forgot-password/forgot-password.module').then(x => x.ForgotPasswordModule) },
        { path: 'company', loadChildren: () => import('./company/company.module').then(x => x.CompanyModule)},
        { path: 'create-company',loadChildren: () => import('./create-company/create-company.module').then(x => x.CreateCompanyModule)},
        { path: 'employee', loadChildren:() => import('./employee/employee.module').then(x=> x.EmployeeModule)}
    ]}
]