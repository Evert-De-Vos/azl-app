import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { IMember, MemberService } from "app/common/models";

@Injectable()
export class MemberResolver implements Resolve<any>{
    
    constructor  
    (private memberService : MemberService) {
        
    }
    
    resolve(route : ActivatedRouteSnapshot){
        return this.memberService.getMemberById(route.params['id']);
    }
}

@Injectable()
export class TrainerResolver implements Resolve<any>{
    
    constructor(private memberService : MemberService) {
        
    }
    
    resolve(){
        return this.memberService.getTrainers();
    }
}