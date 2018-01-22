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
import { Subcategory } from './models/subcategory';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class SubcategoryService {

  constructor(private http: HttpClient) { }

  private subcategoryUrl = baseURL + '/subcategory/'

  /** GET subcategories from the server */
  getSubcategories (): Observable<Subcategory[]> {
    return this.http.get<Subcategory[]>(this.subcategoryUrl)
      .pipe(
        catchError(this.handleError('getSubcategory', []))
      );
  }

  deleteSubcategory (subcategory: Subcategory | number): Observable<Subcategory> {
    const id = typeof subcategory === 'number' ? subcategory : subcategory._id;
    const url = `${this.subcategoryUrl+ "delete"}/${id}`;

    return this.http.delete<Subcategory>(url, httpOptions).pipe(
      catchError(this.handleError<Subcategory>('deleteSubcategory'))
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
