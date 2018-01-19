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
    
  }


}
