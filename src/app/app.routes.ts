import { Routes } from '@angular/router';
import { notAuthenticatedGuard } from './core/auth/guards/not-authenticated-guard';
import { authenticatedGuard } from './core/auth/guards/authenticated-guard';
export const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('./core/auth/auth.routes'),
        canMatch: [
            notAuthenticatedGuard
        ]
    },
    {
        path: '',
        loadChildren: () => import('./components/book-store.routes'),
        canMatch:[
            authenticatedGuard
        ]
    }
];
