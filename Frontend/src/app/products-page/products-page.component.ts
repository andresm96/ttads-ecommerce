import { Component, OnInit } from '@angular/core';
import { Category } from '../models/category';
import { CategoryService } from '../category.service';
import { ProductService } from '../product.service';
import { Product } from '../models/product';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css']
})
export class ProductsPageComponent implements OnInit {

  products: Product[];
  categories: Category[];

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService
    ) { }

  ngOnInit() {
    this.getProducts();
    this.getCategories();
  }

  getCategories(): void {
    this.categoryService.getCategories().subscribe(categories => this.categories = categories);
  }

  getProducts(): void {
    this.productService.getProducts().subscribe(products => this.products = products);
  }

}
