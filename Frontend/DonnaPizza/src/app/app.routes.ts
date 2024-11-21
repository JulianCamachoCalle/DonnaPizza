import { Routes } from '@angular/router';
import { LoginRegisterComponent } from './auth/login-register/login-register.component';
import { DashboardComponent } from './components/PUBLIC_PAGES/dashboard/dashboard.component';
import { InicioComponent } from './components/PUBLIC_PAGES/inicio/inicio.component';
import { PrimerlocalComponent } from './components/PUBLIC_PAGES/primerlocal/primerlocal.component';
import { SegundolocalComponent } from './components/PUBLIC_PAGES/segundolocal/segundolocal.component';
import { CartaComponent } from './components/PUBLIC_PAGES/carta/carta.component';
import { SendEmailComponent } from './components/send-email/send-email.component';
import { PizzasFormComponent } from './components/FORMS/pizzas-form/pizzas-form.component';
import { AdminComponent } from './components/ADMIN/admin/admin.component';
import { CRUDPizzasComponent } from './components/CRUDS/crudpizzas/crudpizzas.component';
import { AuthGuard } from './guards/auth.guard';
export const routes: Routes = [
    { path: '', component: InicioComponent },
    { path: 'carta', component: CartaComponent },
    { path: 'primerlocal', component: PrimerlocalComponent },
    { path: 'segundolocal', component: SegundolocalComponent },
    { path: 'login', component: LoginRegisterComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'admin/email', component: SendEmailComponent },
    { path: 'new-pizza', component: PizzasFormComponent },
    { path: ':id/edit', component: PizzasFormComponent },
    { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
    { path: 'admin/pizzas', component: CRUDPizzasComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: '/' }
];
