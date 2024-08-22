import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', loadChildren: () => import('./public/public.module').then(m => m.PublicModule) },
  { 
    path: 'admin', 
    canActivate:[authGuard],
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) 
  },
  {
    path: 'auth',
    loadChildren: () => import('./public/features/auth/auth.module').then(m => m.AuthModule)

  }
];
