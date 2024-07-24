import { Routes } from '@angular/router';

export const routes: Routes = [
  {path: '', loadChildren:()=> import('./public/public.module').then(m => m.PublicModule)},
  {path: 'admin', loadChildren:()=> import('./admin/admin.module').then(m => m.AdminModule)}
];
