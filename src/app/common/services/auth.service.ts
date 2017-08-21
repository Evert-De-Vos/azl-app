import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable, Subject } from 'rxjs';
import { IUser } from 'app/common/models';

@Injectable()
export class AuthService {
    constructor(private http: Http) {

    }

    loginUser(userName: string, password: string): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http
            .post('/api/login', JSON.stringify({ username: userName, password: password }), options)
            .map((response: Response) => {
                this.setCurrentToken(response.json().token);

                return { successful: true, message: 'succesfull login' };
            })
            .catch(handleError);
    }

    register(username, email, password): Observable<any> {
        let headers = this.standardHeaders();

        return this.http
            .post('/api/register', JSON.stringify({ username: username, email: email, password: password }), headers)
            .map((response: Response) => {
                return { successful: true, message: 'Gebruiker toegevoegd' };
            })
            .catch(handleError);
    }

    changePassword(oldPass, newPass) {
        let headers = this.standardHeaders();
        return this.http
            .post('/api/changepassword', JSON.stringify({ oldpass: oldPass, newpass:newPass }), headers)
            .map((response: Response) => {
                return { successful: true, message: 'Wachtwoord veranderd' };
            })
            .catch(handleError);
    }

    logOut() {
        localStorage.removeItem('azl-token');
    }

    isAuthenticated(): boolean {
        let currentToken = this.getCurrentToken();
        return !!currentToken;
    }

    private getCurrentToken() {
        return localStorage.getItem('azl-token');
    }

    private setCurrentToken(token: any) {
        localStorage.setItem('azl-token', token);
    }

    getAuthToken() {
        let currentToken = this.getCurrentToken()
        if (!!currentToken) {
            return { 'Authorization': 'bearer ' + currentToken };
        }
    }

    private standardHeaders() {
        let headers = new Headers(this.getAuthToken());
        headers.append('Content-Type', 'application/json');
        return new RequestOptions({ headers: headers });
    }
}

function handleError(error: Response) {
    console.log("authservice: error");
    return Observable.throw({ succesfull: false, message: error.statusText });
}