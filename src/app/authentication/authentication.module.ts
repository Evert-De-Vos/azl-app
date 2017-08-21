import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AuthRoutes } from './auth.routes';

import {
  CommonComponentsModule
} from 'app/common';

import {
  LoginComponent,
  ProfileComponent
} from 'app/authentication';

import {
  AuthRouteActivator,
  AuthService
} from "app/common/services";


@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(AuthRoutes)
  ],
  declarations: [
    LoginComponent,
    ProfileComponent
  ],
  providers: [
    AuthRouteActivator,
    AuthService
  ]
})

export class AuthenticationModule {

}
