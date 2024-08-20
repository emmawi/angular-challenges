import { HasPermissionGuard } from './has-permission-guard.service';

export const APP_ROUTES = [
  {
    path: '',
    loadComponent: () =>
      import('./login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'enter',
    canMatch: [HasPermissionGuard],
    data: {
      isAdmin: true,
    },
    loadComponent: () =>
      import('./dashboard/admin.component').then(
        (m) => m.AdminDashboardComponent,
      ),
  },
  {
    path: 'enter',
    canMatch: [HasPermissionGuard],
    data: {
      roles: ['MANAGER'],
    },
    loadComponent: () =>
      import('./dashboard/manager.component').then(
        (m) => m.ManagerDashboardComponent,
      ),
  },
  {
    path: 'enter',
    loadComponent: () =>
      import('./login.component').then((m) => m.LoginComponent),
  },
];
