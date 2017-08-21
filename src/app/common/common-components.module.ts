import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import {
    MainButtonComponent
} from 'app/common/components';

import {
    AuthRouteActivator
} from 'app/common/services';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    declarations: [
        MainButtonComponent,
    ],
    providers: [
        //AuthRouteActivator,
    ],
    exports: [
        MainButtonComponent,
        //AuthRouteActivator
    ]
})

export class CommonComponentsModule {

}