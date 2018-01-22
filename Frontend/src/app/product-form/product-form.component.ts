import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';
import { SubcategoryService } from '../subcategory.service';
import { ProviderService } from '../provider.service';
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
  providers: Provider[];

  constructor(
    private productService: ProductService,
    private subcategoryService: SubcategoryService,
    private providerService: ProviderService
  ) { }

  ngOnInit() {
    this.subcategoryService.getSubcategories()
    .subscribe(subcategories => this.subcategories = subcategories);

    this.providerService.getProviders()
    .subscribe(providers => this.providers = providers);
  }

  saveProduct() {
    this.productService.addProduct(this.newproduct as Product)
    .subscribe(
      data => alert(data),
      error => alert(error)
    );
  }

  updateProduct(){
    this.newproduct._id = this.product._id;
    this.productService.updateProduct(this.newproduct as Product)
    .subscribe(
      data => alert(data),
      error => alert(error)
    )
  }

  deleteProduct(){
    this.productService.deleteProduct(this.product)
    .subscribe(
      data => alert(data),
      error => alert(error)
    )
  }

}
