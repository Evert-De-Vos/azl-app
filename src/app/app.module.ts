import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import {
  AppComponent
} from 'app/app.component';

import {
  AuthService
} from 'app/common/services';

import {
  CommonComponentsModule,
} from 'app/common';

import {
  GroupService,
  AttendanceSheetService,
  MemberService,
} from 'app/common/models';

import {
  AuthRouteActivator,
  GroupListResolver,
  GroupResolver,
  GroupSheetsResolver,
  AttendanceSheetResolver,
  TrainerResolver,
  MemberResolver
} from 'app/common/services';

import {
  DateValueAccessor
} from 'app/common/directives';

import {
  NavBarComponent
} from 'app/nav-bar/nav-bar.component';

import {
  GroupListComponent,
  GroupDetailsComponent,
} from 'app/groups/index';

import {
  CreateAttendanceComponent,
  EditAttendanceComponent,
  AttendanceFormComponent
} from 'app/attendancesheets';

import {
  appRoutes
} from 'app/routes';


@NgModule({
  imports: [
    CommonComponentsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [
    AppComponent,

    NavBarComponent,

    GroupListComponent,
    GroupDetailsComponent,
    CreateAttendanceComponent,
    EditAttendanceComponent,
    AttendanceFormComponent,
    EditAttendanceComponent,
    EditAttendanceComponent,
    DateValueAccessor
  ],
  providers: [
    GroupService,
    GroupListResolver,
    GroupResolver,
    AttendanceSheetService,
    GroupSheetsResolver,
    AttendanceSheetResolver,
    MemberService,
    MemberResolver,
    TrainerResolver,
    AuthService,
    AuthRouteActivator
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
