import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { AttendanceSheetService } from 'app/common/models';

@Injectable()
export class GroupSheetsResolver implements Resolve<any>{

    constructor(private sheetService: AttendanceSheetService) {

    }

    resolve(route: ActivatedRouteSnapshot) {
        return this.sheetService.getSheetsByGroupId(route.params['id']);
    }
}

@Injectable()
export class AttendanceSheetResolver implements Resolve<any>{

    constructor(private sheetService: AttendanceSheetService) {

    }

    resolve(route: ActivatedRouteSnapshot) {
        return this.sheetService.getSheetById(route.params['id']);
    }
}