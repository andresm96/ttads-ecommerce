import { Component, OnInit } from '@angular/core';
import { Category } from '../models/category';
import { CategoryService } from '../category.service';
import { ProductService } from '../product.service';
import { Product } from '../classes/product';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  categories: Category[];
  products: Product[];

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.getCategories();
  }

  getCategories(): void {
    this.categoryService.getCategories().subscribe(categories => this.categories = categories);
  }

  getProducts(): void {
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
    });
  }

}
