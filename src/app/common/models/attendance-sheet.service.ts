import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";

import { Subject, Observable } from 'rxjs';

import { IGroup, IAttendanceSheet } from './index';
import { AuthService } from 'app/common/services';


@Injectable()
export class AttendanceSheetService {

    constructor(private http: Http, private auth: AuthService) {

    }

    getSheetsByGroupId(groupId: string): Observable<IAttendanceSheet[]> {
        let options = this.standardHeaders();

        return this.http
            .get('/api/sheets/findbygroup/' + groupId, options)
            .map((response: Response) => {
                let sheets: IAttendanceSheet[] = [];

                if (response && response.status === 200) {
                    
                    return <IAttendanceSheet[]> response.json();
                }

                return sheets;
            }).catch(handleError);
    }

    getSheetById(id: string): Observable<IAttendanceSheet[]> {
        let options = this.standardHeaders();

        return this.http
            .get('/api/sheets/findbyid/' + id, options)
            .map((response: Response) => {

                return <IAttendanceSheet> response.json();
                
            }).catch(handleError);
    }

    addSheet(sheet: IAttendanceSheet): void {
        let options = this.standardHeaders();

        this.http
            .post('/api/sheets/add', JSON.stringify(sheet), options)
            .catch(handleError)
            .subscribe();
    }

    updateSheet(sheet: IAttendanceSheet){
        let options = this.standardHeaders();

        this.http
            .put('api/sheets/update/' + sheet.id, JSON.stringify(sheet), options)
            .catch(handleError)
            .subscribe();
    }

    private standardHeaders() {         
        let headers = new Headers( this.auth.getAuthToken() );
        headers.append( 'Content-Type', 'application/json');
        return new RequestOptions({ headers: headers });
    }
}

function handleError(error: Response) {
    console.log("attendanceSheet")
    console.log(error);
    return Observable.throw( {message: error.json().message });
}