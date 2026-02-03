import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
    { 
        path: 'login', 
        loadComponent: () => import('./features/login/login').then(m => m.Login) 
    },
    {
        path: 'admin',
        canActivate: [authGuard],
        loadComponent: () => import('./layout/admin-layout/admin-layout').then(m => m.AdminLayout),
        children: [
            { 
                path: 'dashboard', 
                loadComponent: () => import('./features/dashboard/dashboard').then(m => m.Dashboard) 
            },
            { 
                path: 'users', 
                loadComponent: () => import('./features/users/users').then(m => m.Users) 
            },
            { path: 'settings', 
                loadComponent: () => import('./features/settings/settings').then(m => m.Settings)
            }

        ]
    },
    { 
        path: '', 
        redirectTo: '/login', 
        pathMatch: 'full' 
    },
    {
        path: '**',
        redirectTo: '/login'
    },
];
