import { Injectable } from '@angular/core';
import { Product } from './models/product';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class ProductService {

  constructor(private http: HttpClient) { }

  private productsUrl = 'api/products';  // URL to web api

  /** GET products from the server */
  getProducts (): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl)
      .pipe(
        catchError(this.handleError('getProducts', []))
      );
  }

  /** GET products by id. Will 404 if id not found */
  getProduct(id: number): Observable<Product> {
    const url = `${this.productsUrl}/${id}`;
    return this.http.get<Product>(url).pipe(
      catchError(this.handleError<Product>(`getHero id=${id}`))
    );
  }

  /* GET (Search) products whose name contains search term */
  searchProducts(term: string): Observable<Product[]> {
  if (!term.trim()) {
    // if not search term, return empty product array.
    return of([]);
  }
  return this.http.get<Product[]>(`api/products/?name=${term}`).pipe(
    catchError(this.handleError<Product[]>('searchProducts', []))
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