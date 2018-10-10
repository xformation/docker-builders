import { AuthGuard } from './security/auth-guard.service';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';


export const appRouter: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'auth', loadChildren: './auth/auth.module#AuthModule' },
    { path: 'dashboard', loadChildren:  './dashboard/dashboard.module#DashboardModule', canActivate: [AuthGuard] },
    { path: 'admin', loadChildren:  './admin/admin.module#AdminModule', canActivate: [AuthGuard] }
    
];

export const AppRouter: ModuleWithProviders = RouterModule.forRoot(appRouter);
