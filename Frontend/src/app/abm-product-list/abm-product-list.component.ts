import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Product } from '../models/product';
import { ProductService } from '../product.service';

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-abm-product-list',
  templateUrl: './abm-product-list.component.html',
  styleUrls: ['./abm-product-list.component.css']
})
export class AbmProductListComponent implements OnInit {

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();
  onFormActive = false;
  typeForm = 0;
  productSelected :Product;

  products: Product[] =[];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      columnDefs: [{ 
        orderable: false, 
        searchable: false, 
        targets: [3] 
        }],
      responsive: true
    };
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProducts()
    .map(result => {
      var array = [];
      result.forEach(item => {
        var product = new Product();
        product._id = item._id;
        product.name = item.name;
        product.subcategory = item.subcategory;
        product.description = item.description;
        array.push(product);  
      });
      return array;
    })
    .subscribe(products => {
      this.products= products;
      this.dtTrigger.next();
    });
  }

  newProduct(){
    this.onFormActive = true;
    this.typeForm = 1;
  }

  updateProduct(product: Product){
    this.productSelected = product;
    this.onFormActive = true;
    this.typeForm = 2;
  }

  deleteProduct(product: Product){
    this.productSelected = product;
    this.onFormActive = true;
    this.typeForm = 3;
  }

}