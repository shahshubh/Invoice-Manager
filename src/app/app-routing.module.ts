import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { NoAuthGuardService } from './core/services/no-auth-guard.service';

const routes: Routes = [
    {
        path: 'login',
        component: AuthComponent,
        canActivate: [NoAuthGuardService]
    },
    {
        path: 'signup',
        component: AuthComponent,
        canActivate: [NoAuthGuardService]
    },
    {
        path: 'dashboard',
        loadChildren: 'app/dashboard/dashboard.module#DashboardModule'
    },
    {
        path: '**',
        redirectTo: 'dashboard'
    }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
