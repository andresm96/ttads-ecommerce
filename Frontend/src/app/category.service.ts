import { Injectable } from '@angular/core';
import { Category } from './models/category';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { baseURL } from './back-url-path'; 
import { AuthenticationService } from './guard-services/authentication.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class CategoryService {

  constructor(private http: HttpClient) { }

  private categoriesUrl = baseURL + '/category/';  // URL to web api

  getCategories (): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoriesUrl)
      .pipe(
        catchError(this.handleError('getCategory', []))
      );
  }

  /** POST: add a new category to the server */
  addCategory (category: Category): Observable<Category> {
    return this.http.post<Category>(this.categoriesUrl + "new", category, httpOptions).pipe(
      catchError(this.handleError<Category>('addCategory'))
    );
  }

  /** PUT: update the category on the server */
  updateCategory (category: Category | number): Observable<Category> {
    const id = typeof category === 'number' ? category : category._id;
    const url = `${this.categoriesUrl+ "update"}/${id}`;

    return this.http.put(url, category, httpOptions).pipe(
      catchError(this.handleError<any>('updateCategory'))
    );
  }

  deleteCategory (category: Category | number): Observable<Category> {
    const id = typeof category === 'number' ? category : category._id;
    const url = `${this.categoriesUrl+ "delete"}/${id}`;

    return this.http.delete<any>(url, httpOptions).pipe(
      catchError(this.handleError<Category>('deleteCategory'))
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
