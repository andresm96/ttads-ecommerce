import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../product.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() products: Product[];

  //products: Product[];

  constructor(private productService: ProductService) { }

  ngOnInit() {
    //this.getProducts();
  }

  /*getProducts(): void {
    this.productService.getProducts().subscribe(products => this.products = products);
  }*/

}
