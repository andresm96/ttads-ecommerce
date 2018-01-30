import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { StorageService } from "./../shopping-cart-services/storage.service";
//import decode from 'jwt-decode';
import * as decode from 'jwt-decode';

@Injectable()
export class RoleGuardService implements CanActivate {

  public localStorage: Storage;

  constructor(
    public auth: AuthenticationService,
    private storageService: StorageService, 
    public router: Router) {
      this.localStorage = this.storageService.get();
    }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    // this will be passed from the route config
    // on the data property
    const expectedRole = route.data.expectedRole;
    const token = this.auth.retrieve();

    let tokenPayload;
    if(token){
      // decode the token to get its payload
      tokenPayload = decode(token);
    }

    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['unauthorized']);
      return false;
    } else if (tokenPayload.role !== expectedRole) {
      this.router.navigate(['forbidden']);
      return false;
    }
    return true;
  }

}
