import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { GroupService, IGroup } from 'app/common/models';

@Injectable()
export class GroupResolver implements Resolve<any>{

    constructor(private groupService: GroupService) {

    }

    resolve(route: ActivatedRouteSnapshot) {
        return this.groupService.getGroup(route.params['id']);

    }
}

@Injectable()
export class GroupListResolver implements Resolve<any>{
    
    constructor(private groupService : GroupService) {
        
    }
    
    resolve(){
        return this.groupService.getGroups().map(groups => groups);
    }
}