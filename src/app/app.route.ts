import { Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
export const appRoutes: Routes = [
    //localhost:4200
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    //localhost:4200/login
    { path: 'login', loadChildren: () => import('./company/login/login.module').then(x => x.LoginModule) },
    { path: 'register', loadChildren: () => import('./company/register/register.module').then(x => x.RegisterModule) },
    { path: 'main',  loadChildren: () => import('./company/main.module').then(x => x.MainModule), canActivate:[AuthGuard] },
]