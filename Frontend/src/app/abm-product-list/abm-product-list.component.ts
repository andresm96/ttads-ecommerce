import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Product } from '../classes/product';
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
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  products: Product[] =[];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this.getProducts();
  }
  
  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  getProducts(): void {
    this.productService.getProducts()
    .map(result => {
      var array = [];
      result.forEach(item => {
        var product = new Product();
        product.id = item._id;
        product.name = item.name;
        product.subcategory = item.subcategory.name;
        product.description = item.description;
        array.push(product);
      });
      return array;
    })
    .subscribe(products => {
      this.products= products;
    });
  }

  delete(product: Product): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      this.products = this.products.filter(p => p !== product);
      this.productService.deleteProduct(product).subscribe();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }
}