import { Injectable } from '@angular/core';
import { Product } from './models/product';

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
export class ProductService {

  constructor(private http: HttpClient) { }

  private productUrl = baseURL + '/product/';
  
      /** GET providers from the server */
      getProducts (): Observable<Product[]> {
        return this.http.get<Product[]>(this.productUrl)
          .pipe(
            catchError(this.handleError('getProduct', []))
          );
      }

      /** POST: add a new category to the server */
      addProduct (product: Product): Observable<Product> {
        return this.http.post<Product>(this.productUrl + "new", product, httpOptions).pipe(
          catchError(this.handleError<Product>('addProduct'))
        );
      }

      /** PUT: update the category on the server */
      updateProduct (product: Product | number): Observable<Product> {
        const id = typeof product === 'number' ? product : product._id;
        const url = `${this.productUrl+ "update"}/${id}`;

        return this.http.put(url, product, httpOptions).pipe(
          catchError(this.handleError<any>('updateProduct'))
        );
      }

      deleteProduct (product: any | number): Observable<Product> {
        const id = typeof product === 'number' ? product : product._id;
        const url = `${this.productUrl+ "delete"}/${id}`;
    
        return this.http.delete<Product>(url, httpOptions).pipe(
          catchError(this.handleError<Product>('deleteProduct'))
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
