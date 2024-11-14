import { Routes } from '@angular/router';
import { LoginRegisterComponent } from './auth/login-register/login-register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { PrimerlocalComponent } from './components/primerlocal/primerlocal.component';
import { SegundolocalComponent } from './components/segundolocal/segundolocal.component';
import { CartaComponent } from './components/carta/carta.component';
import { SendEmailComponent } from './components/send-email/send-email.component';

export const routes: Routes = [
    { path: '', component: InicioComponent },
    { path: 'carta', component: CartaComponent },
    { path: 'primerlocal', component: PrimerlocalComponent },
    { path: 'segundolocal', component: SegundolocalComponent },
    { path: 'login', component: LoginRegisterComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'admin/email', component: SendEmailComponent },
];
