import { Routes } from '@angular/router';
import { EmployeeComponent } from './employee.component';
export const employeeRoutes: Routes = [
    { path: '', redirectTo: 'index' },
    { path: 'index',  component: EmployeeComponent},
    { path: 'employee-info', loadChildren: () => import('./employee-info/employee-info.module').then(x => x.EmployeeInfoModule)},
]