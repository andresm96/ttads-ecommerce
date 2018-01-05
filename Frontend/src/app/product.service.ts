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

}