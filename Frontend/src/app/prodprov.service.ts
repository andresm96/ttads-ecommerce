import { Injectable } from '@angular/core';
import { Product } from './models/product';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { baseURL } from './back-url-path';
import { ProdProv } from './models/prod-prov';
import { FileUploader } from 'ng2-file-upload';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ProdProvService {



  constructor(private http: HttpClient) { }

  private productsUrl = baseURL + '/prodprov/';  // URL to web api

  /** GET products from the server */
  getProducts (): Observable<ProdProv[]> {
    return this.http.get<ProdProv[]>(this.productsUrl)
      .pipe(
        catchError(this.handleError('getProducts', []))
      );
  }

  getHighlights(): Observable<ProdProv[]> {
    return this.http.get<ProdProv[]>(this.productsUrl+"highlights")
      .pipe(
        catchError(this.handleError('getProducts', []))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getProduct(id: string): Observable<ProdProv> {
    const url = `${this.productsUrl}${id}`;
    return this.http.get<ProdProv>(url).pipe(
      catchError(this.handleError<ProdProv>(`getProduct id=${id}`))
    );
  }

  getProductsBySubcategory(id: string): Observable<ProdProv[]> {
    const url = this.productsUrl + "/subcategory/"+ id;
    return this.http.get<ProdProv[]>(url)
      .pipe(
       catchError(this.handleError<ProdProv[]>(`getProduct id=${id}`))
    );
  }

  getProductImageUrl(id: string): string{
    const url = `${this.productsUrl}${id}` +"/image";
    console.log(url);
    return url;
  }

  /* GET (Search) products whose name contains search term */
  searchProducts(term: string): Observable<any> {
    if (!term.trim()) {
      // if not search term, return empty product array.
      return of([]);
    }
    return this.http.get<any>(baseURL+`/product/search?name=${term}`).map(res => {return res.products}).pipe(
      catchError(this.handleError<ProdProv[]>('searchProducts', []))
    );
  }

  /** PUT: update the product on the server */
  updateProduct (prodprov: ProdProv | number): Observable<ProdProv> {
    const id = typeof prodprov === 'number' ? prodprov : prodprov._id;
    const url = `${this.productsUrl+ "update"}/${id}`;

    return this.http.put(url, prodprov, httpOptions).pipe(
      catchError(this.handleError<any>('updateProduct'))
    );
  }

  /** POST: add a new product to the server */
  addProduct (prodprov: ProdProv): Observable<any> {
    return this.http.post<any>(this.productsUrl + "new", prodprov, httpOptions).pipe(
      catchError(this.handleError<any>('addProduct'))
    );
  }

  /** DELETE: delete the product from the server */
  deleteProduct (prodprov: ProdProv | number): Observable<ProdProv> {
    const id = typeof prodprov === 'number' ? prodprov : prodprov._id;
    const url = `${this.productsUrl+ "delete"}/${id}`;

    return this.http.delete<ProdProv>(url, httpOptions).pipe(
      catchError(this.handleError<ProdProv>('deleteProduct'))
    );
  }

  addProductImage(file, _id:any){
    let URL = this.productsUrl + _id + "/image";
    console.log(file);
    let uploader: FileUploader = new FileUploader({url: URL});
    uploader.queue.push(file);
    if(uploader.queue.length === 0){
      console.log("no se agrego ni bosta");
    }
    else{
      console.log("se agrego creo que esto: "+ uploader.queue[0]);
    }
    uploader.uploadAll(); 

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