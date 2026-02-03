import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
    { 
        path: 'login', 
        loadComponent: () => import('./components/login/login').then(m => m.Login) 
    },
    {
        path: 'admin',
        canActivate: [authGuard],
        loadComponent: () => import('./components/dashboard/dashboard').then(m => m.Dashboard),
        children: [
            { 
                path: 'dashboard', 
                loadComponent: () => import('./components/dashboard/dashboard').then(m => m.Dashboard) 
            },
            { 
                path: 'users', 
                loadComponent: () => import('./components/dashboard/dashboard').then(m => m.Dashboard) 
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
