import {Injectable, Injector} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const auth = this.injector.get(AuthenticationService);
    // Get the auth header from the service.
    const token = auth.retrieve();
    // Clone the request to add the new header.
    const authReq = req.clone({headers: req.headers.set('x-access-token', token)});
    // Pass on the cloned request instead of the original request.
    return next.handle(authReq);
  }
}