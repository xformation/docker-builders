import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [];

export const adminRouter: Routes = [ 
  { path: '', redirectTo: 'userProfile', pathMatch: 'full' }, 
  { path: 'userProfile', component: UserProfileComponent },
    
];
export const AdminRoutingModule: ModuleWithProviders = RouterModule.forChild(adminRouter);

