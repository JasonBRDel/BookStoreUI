import { Routes } from "@angular/router";
import { AuthLayoutComponent } from "./layout/auth-layout-component/auth-layout-component";
import { LoginComponent } from "./pages/login-component/login-component";
import { RegisterComponent } from "./pages/register-component/register-component";

export const authRoutes: Routes = [
    {
        path: '',
        component: AuthLayoutComponent,
        children: [
            {
                path: 'login',
                component: LoginComponent
            },
            {
                path: 'register',
                component: RegisterComponent
            },
            {
                path: '**',
                redirectTo: 'login'
            }

        ]
    }
];

export default authRoutes;