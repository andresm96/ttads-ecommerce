import { Injectable } from '@angular/core';
import { Provider } from './models/provider';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { baseURL } from './back-url-path';
import { ProdProv } from './models/prod-prov';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ProviderService {

  constructor(private http: HttpClient) { }

  private providerUrl = baseURL + '/provider/'

  /** GET providers from the server */
  getProviders (): Observable<Provider[]> {
    return this.http.get<Provider[]>(this.providerUrl)
      .pipe(
        catchError(this.handleError('getProvider', []))
      );
  }

  /** POST: add a new category to the server */
  addProvider (provider: Provider): Observable<Provider> {
    return this.http.post<Provider>(this.providerUrl + "new", provider, httpOptions).pipe(
      catchError(this.handleError<Provider>('addProvider'))
    );
  }

  /** PUT: update the category on the server */
  updateProvider (provider: Provider | number): Observable<Provider> {
    const id = typeof provider === 'number' ? provider : provider._id;
    const url = `${this.providerUrl+ "update"}/${id}`;

    return this.http.put(url, provider, httpOptions).pipe(
      catchError(this.handleError<any>('updateProvider'))
    );
  }

  deleteProvider (provider: Provider | number): Observable<Provider> {
    const id = typeof provider === 'number' ? provider : provider._id;
    const url = `${this.providerUrl+ "delete"}/${id}`;

    return this.http.delete<Provider>(url, httpOptions).pipe(
      catchError(this.handleError<Provider>('deleteProvider'))
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
