import { Component, OnInit } from '@angular/core';
import { ProdProv } from '../models/prod-prov';
import { Product } from '../classes/product';
import { ProductService } from '../product.service';
import { Subject } from 'rxjs/Subject';


import 'rxjs/add/operator/map';

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
  dtOptions: DataTables.Settings = {};
  products: Product[] = [];
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject();

  private dataUrl = 'api/data';  // URL to web api

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this.productService.getProducts()
    .map(result => {
      let array = [];
      result.forEach(item => {
        let product = new Product();
        product.ID = item._id;
        product.Nombre = item.idProduct.name;
        product.Precio = item.price;
        product.Proveedor = item.idProvider.company;
        array.push(product);
      });
      return array;
    })
    .subscribe(products => {
      this.products = products;

      this.dtTrigger.next();
    });
  }
}