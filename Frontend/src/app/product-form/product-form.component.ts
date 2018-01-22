import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';
import { SubcategoryService } from '../subcategory.service';
import { Subcategory } from '../models/subcategory';
import { Provider } from '@angular/compiler/src/core';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  @Input() typeForm: any;
  @Input() product: Product;
  newproduct = { _id: ''};
  subcategories: Subcategory[];
  uploadProduct = 0;

  constructor(
    private productService: ProductService,
    private subcategoryService: SubcategoryService
  ) { }

  ngOnInit() {
    this.subcategoryService.getSubcategories()
    .subscribe(subcategories => this.subcategories = subcategories);
  }

  saveProduct() {
    this.productService.addProduct(this.newproduct as Product)
    .subscribe(
      data => {
        alert(data);
        this.uploadProduct = 1;
        },
      error => alert(error)
    );
  }

  updateProduct(){
    this.newproduct._id = this.product._id;
    this.productService.updateProduct(this.newproduct as Product)
    .subscribe(
      data => {
        alert(data);
        this.uploadProduct = 1;
        },
      error => alert(error)
    )
  }

  deleteProduct(){
    this.productService.deleteProduct(this.product)
    .subscribe(
      data => {
        alert(data);
        this.uploadProduct = 1;
        },
      error => alert(error)
    )
  }

  refresh(){
    location.reload();
  }

}
