import { Injectable } from '@angular/core';
import { Customer } from './models/customer';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { baseURL } from './back-url-path';


import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class CustomerService {

  constructor(private http: HttpClient) { }

  private customersUrl = baseURL + '/customer/';

  //Get All Customers
  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.customersUrl)
    .pipe(
      catchError(this.handleError('getCustomers()', []))
    );
  }

  //Add new customer
  addCustomer (customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.customersUrl + "new", customer, httpOptions).pipe(
      catchError(this.handleError<Customer>('addCustomer'))
    );
  }

  //Update customer
  updateCustomer (customer: any | number): Observable<Customer> {
    const id = typeof customer === 'number' ? customer : customer.id;
    const url = `${this.customersUrl+ "update"}/${id}`;

    return this.http.put(url, customer, httpOptions).pipe(
      catchError(this.handleError<any>('updateCustomer'))
    );
  }

  deleteCustomer (customer: any | number): Observable<Customer> {
    const id = typeof customer === 'number' ? customer : customer.id;
    const url = `${this.customersUrl+ "delete"}/${id}`;

    return this.http.delete<Customer>(url, httpOptions).pipe(
      catchError(this.handleError<Customer>('deleteCustomer'))
    );
  }

   /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}

}
