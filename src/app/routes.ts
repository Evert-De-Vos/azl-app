import { Routes } from '@angular/router';

import {
    AuthRouteActivator,
    TrainerResolver,
    GroupResolver,
    GroupListResolver,
    GroupSheetsResolver,
    AttendanceSheetResolver,

} from 'app/common/services';

import {
    GroupListComponent,
    GroupDetailsComponent,
} from 'app/groups';

import {
    CreateAttendanceComponent,
    EditAttendanceComponent
} from 'app/attendancesheets';

export const appRoutes: Routes = [
    {
        path: 'groups',
        component: GroupListComponent,
        canActivate: [AuthRouteActivator],
        resolve: { groups: GroupListResolver }
    },
    {
        path: 'groups/:id',
        component: GroupDetailsComponent,
        canActivate: [AuthRouteActivator],
        resolve: { group: GroupResolver, sheets: GroupSheetsResolver }
    },
    {
        path: 'groups/:id/newsheet',
        component: CreateAttendanceComponent,
        canActivate: [AuthRouteActivator],
        resolve: {
            group: GroupResolver,
            trainers: TrainerResolver
        }
    },
    {
        path: 'groups/editsheet/:id',
        component: EditAttendanceComponent,
        canActivate: [AuthRouteActivator],
        resolve: {
            sheet: AttendanceSheetResolver,
            trainers: TrainerResolver
        }        
    },
    {
        path: '',
        redirectTo: '/groups',
        pathMatch: 'full'
    },
    {
        path: 'user',
        loadChildren: 'app/authentication/authentication.module#AuthenticationModule'
    }
];