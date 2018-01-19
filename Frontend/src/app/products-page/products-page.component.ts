import { Component, OnInit } from '@angular/core';
import { Category } from '../models/category';
import { CategoryService } from '../category.service';
import { ProdProvService } from '../prodprov.service';
import { Product } from '../models/product';
import { ProdProv } from '../models/prod-prov';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css']
})
export class ProductsPageComponent implements OnInit {

  products: ProdProv[];
  categories: Category[];

  constructor(
    private categoryService: CategoryService,
    private prodprovService: ProdProvService
    ) { }

  ngOnInit() {
    this.getProducts();
    this.getCategories();
  }

  getCategories(): void {
    this.categoryService.getCategories().subscribe(categories => this.categories = categories);
  }

  getProducts(): void {
    this.prodprovService.getProducts().subscribe(products => this.products = products);
  }

}
