import { Routes } from '@angular/router';

import {
    AuthRouteActivator
} from 'app/common/services';

import {
    LoginComponent,
    ProfileComponent
} from 'app/authentication';

export const AuthRoutes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthRouteActivator]
    }
]
