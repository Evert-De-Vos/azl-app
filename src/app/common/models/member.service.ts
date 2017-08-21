import { Injectable } from '@angular/core';
import { IMember } from 'app/common/models';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Subject, Observable } from 'rxjs/RX';
import { AuthService } from 'app/common/services';

@Injectable()
export class MemberService {

  constructor(private http: Http, private auth: AuthService) { }

  getMembers(): Observable<IMember[]> {
    let options = this.standardHeaders();

    return this.http
      .get('/api/members/all', options)
      .map((response: Response) => {
        return <IMember[]>response.json();


      }).catch(handleError);
  }

  getTrainers(): Observable<IMember[]> {
    let options = this.standardHeaders();

    return this.http
      .get('/api/members/trainers/all', options)
      .map((response: Response) => {

        return <IMember[]>response.json();

      }).catch(handleError);
  }

  getMemberById(id: string): Observable<IMember> {
    let options = this.standardHeaders();

    return this.http
      .get('/api/members/findbyid/' + id, options)
      .map((response: Response) => {

        return <IMember> response.json();

      }).catch(handleError);
  }

  private standardHeaders() {
    let headers = new Headers(this.auth.getAuthToken());
    headers.append('Content-Type', 'application/json');
    return new RequestOptions({ headers: headers });
  }
}

function handleError(error: Response) {
  console.log("memberservice")
  console.log(error);
  return Observable.throw('Members :' + error.statusText);
}