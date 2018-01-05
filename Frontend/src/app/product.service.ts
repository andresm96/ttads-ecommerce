import { Injectable } from '@angular/core';
import { Product } from './product';
import { PRODUCTS } from './mock-products';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class ProductService {

  constructor() { }

  getProducts(): Observable<Product[]> {
    return of(PRODUCTS);
  }

  getProduct(id: number): Observable<Product> {
    // Todo: send the message _after_ fetching the product
    return of(PRODUCTS.find(product => product.id === id));
  }

  /* GET products whose name contains search term */
  searchProducts(term: string): Observable<Product[]> {
  if (!term.trim()) {
    // if not search term, return empty product array.
    return of([]);
  }
  return this.http.get<Product[]>(`api/products/?name=${term}`).pipe(
    tap(_ => this.log(`found products matching "${term}"`)),
    catchError(this.handleError<Product[]>('searchProducts', []))
  );
}

}