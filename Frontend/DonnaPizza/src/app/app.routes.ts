import { Routes } from '@angular/router';
import { LoginRegisterComponent } from './auth/login-register/login-register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const routes: Routes = [
    { path: 'login', component: LoginRegisterComponent},
    { path: 'dashboard', component: DashboardComponent},
];
