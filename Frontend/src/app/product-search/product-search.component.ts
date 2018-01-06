import { Component, OnInit } from '@angular/core';
 
import { Observable } from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';
import { of }         from 'rxjs/observable/of';
 
import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';
 
import { Product } from '../product';
import { ProductService } from '../product.service';
 
@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: [ './product-search.component.css' ]
})
export class ProductSearchComponent implements OnInit {
  products$: Observable<Product[]>;
  private searchTerms = new Subject<string>();
  private hide: boolean = true;
 
  constructor(private productService: ProductService) {}
 
  // Push a search term into the observable stream.
  search(term: string): void {
    this.hide = true;
    this.searchTerms.next(term);
  }

  hideBar(): void {
    this.hide = false;
  }
  
 
  ngOnInit(): void {
    this.products$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(200),
 
      // ignore new term if same as previous term
      distinctUntilChanged(),
 
      // switch to new search observable each time the term changes
      switchMap((term: string) => this.productService.searchProducts(term)),
    );
  }
}