import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { AuthService } from "app/common/services";


@Injectable()
export class AuthRouteActivator implements CanActivate{
    
    constructor(private authService: AuthService, private router:Router) {

    }
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let isAuth = this.authService.isAuthenticated()
        
        if(!isAuth)
            this.router.navigate(['/user/login']);

        return isAuth;
    }
}