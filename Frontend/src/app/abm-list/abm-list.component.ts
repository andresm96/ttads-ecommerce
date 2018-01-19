import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Product } from '../classes/product';
import { ProductService } from '../product.service';

import { Subject } from 'rxjs/Subject';


import 'rxjs/add/operator/map';
import { CategoryService } from '../category.service';
import { Category } from '../classes/category';

class Person {
  id: number;
  firstName: string;
  lastName: string;
}

@Component({
  selector: 'app-abm-list',
  templateUrl: './abm-list.component.html',
  styleUrls: ['./abm-list.component.css']
})
export class AbmListComponent implements OnInit {

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  items: any[] =[{}];
  action: string = 'products';


  constructor(
    private productService: ProductService,
    private categoryService: CategoryService
  ) { }

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
        product.ID = item._id;
        product.Nombre = item.idProduct.name;
        product.Precio = item.price;
        product.Proveedor = item.idProvider.company;
        array.push(product);
      });
      return array;
    })
    .subscribe(products => {
      this.items= products;

    });
  }

  getCategories():void {
    this.categoryService.getCategories()
    .map(result => {
      var array = [];
      result.forEach(item => {
        var category = new Category();
        category.ID = item._id;
        category.Nombre = item.name;
        array.push(category);
      });
      return array;
    })
    .subscribe(categories => this.items = categories);
  }

}