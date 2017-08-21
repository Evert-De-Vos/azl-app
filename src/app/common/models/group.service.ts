import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";

import { Subject, Observable } from 'rxjs';

import { IGroup } from './index';
import { AuthService } from 'app/common/services';

@Injectable()
export class GroupService {

    constructor(private http: Http, private auth: AuthService) {

    }

    getGroups(): Observable<IGroup[]> {
        let options = this.standardHeaders();

        return this.http
            .get('/api/groups/all', options)
            .map((response: Response) => {
               
                return <IGroup[]> response.json();

            })
            .catch(handleError);
    }

    getGroup(id: string): Observable<IGroup> {
        let options = this.standardHeaders();

        return this.http
            .get('/api/groups/findbyid/' + id, options)
            .map((response: Response) => {
                
                return <IGroup> response.json();

            })
            .catch(handleError);
    }

    addGroup(name: string): Observable<IGroup> {
        let options = this.standardHeaders();

        return this.http
            .post('/api/groups/add', JSON.stringify({ name: name }), options)
            .map((Response: Response) => { 

                return <IGroup>Response.json();
                
             })
            .catch(handleError);
    }

    removeGroup(id: string) {
        let options = this.standardHeaders();

        return this.http
            .delete('/api/groups/delete/' + id, options)
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
    console.log("groupservice")
    console.log(error);
    return Observable.throw({succesfull: false, message: error.json().message });
}
