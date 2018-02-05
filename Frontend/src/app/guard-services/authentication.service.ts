import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { baseURL } from './../back-url-path';

import { Response } from '@angular/http';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import { Credential } from './../models/credential';

import { Router } from '@angular/router';
import { StorageService } from "./../shopping-cart-services/storage.service";
import { JwtHelper} from 'angular2-jwt';
import decode from 'jwt-decode';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AuthenticationService {

  localStorage: Storage;
  token: string;
  private customersUrl = baseURL + '/customer';

  constructor(
    private http: HttpClient,
    private storageService: StorageService,
  ) {  
    this.localStorage = this.storageService.get();
    // set token if saved in local storage
    var token = this.localStorage.getItem('token');
    this.token = token;
  }

  login(credentials: Credential): Observable<boolean> {
    return this.http.post<any>(this.customersUrl+'/login', credentials, httpOptions)
    .map(res => {
      // login successful if there's a jwt token in the response
      let token = res.token;
      if (token) {
          // set token property
          this.token = token;

          // store username and jwt token in local storage to keep user logged in between page refreshes
          this.localStorage.setItem('token', token);

          // return true to indicate successful login
          return true;
      } else {
          // return false to indicate failed login
          return false;
      }
  });
  }

  logout():void {
    // clear token remove user from local storage to log user out
    // clear token remove user from local storage to log user out
    this.token = null;
    this.localStorage.removeItem('token');
  }
  

  save(token: string): void {
    this.localStorage.setItem('token', token);
  }

  retrieve(): string {
    const storedToken = this.localStorage.getItem('token');
    if (storedToken) {
      return storedToken;
    }
  }

  public isAuthenticated(): boolean {
    let jwtHelper: JwtHelper = new JwtHelper();
    const token = this.retrieve();
    // Check whether the token is expired and return
    // true or false
    if(token){
      return !jwtHelper.isTokenExpired(token);
    } else {
      return false;
    }
  }

  public isAdmin(): boolean {
    if(this.isAuthenticated && this.retrieve()){
      const expectedRole = 'admin';
      const token = this.retrieve();
      // decode the token to get its payload
      const tokenPayload = decode(token);
      if (tokenPayload.role == expectedRole) {
        return true;
      } else {
        return false;
      }
    }
  }

  public getUserId(): string {
    let token = this.retrieve();
    if(token) {
      const tokenPayload = decode(token);
      return tokenPayload.id;
    } else {
      return '';
    }
  }
  
}
