import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/product';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ProductService }  from '../product.service';
import { ProdProv } from '../models/prod-prov';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  
  prodprov: ProdProv;
  imageUrl: string;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getProdProv();
    this.getProdProvImage();
  }

  getProdProv(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.productService.getProduct(id)
      .subscribe(prodprov => this.prodprov = prodprov);
  }

  getProdProvImage(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.imageUrl = this.productService.getProductImageUrl(id)
  }

  goBack(): void {
    this.location.back();
  }

}
