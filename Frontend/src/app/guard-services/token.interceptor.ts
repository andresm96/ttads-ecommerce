import {Injectable, Injector} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get the authService with injector because if we inject auth we get a cyclic dependency!
    const auth = this.injector.get(AuthenticationService);
    // Get the token from service (localStorage)
    console.log(req.url);
    const token = auth.retrieve();
    let authReq = req;
    if(token){
      // Clone the request to add the new header.
      authReq = req.clone({headers: req.headers.set('x-access-token', token)});
    }
    return next.handle(authReq);
  }
}