import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/product';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ProdProvService }  from '../prodprov.service';
import { ProdProv } from '../models/prod-prov';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  
  prodprov: ProdProv;
  imageUrl: string;
  id: string;

  constructor(
    private route: ActivatedRoute,
    private prodprovService: ProdProvService,
    private location: Location
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getProdProv();
    this.getProdProvImage();
  }

  ngDoCheck() {
    let newId = this.route.snapshot.paramMap.get('id');
    if (newId !== this.id) {
      this.getProdProv();
      this.getProdProvImage();
    }
  }
  

  getProdProv(): void {
    //const id = this.route.snapshot.paramMap.get('id');
    this.prodprovService.getProduct(this.id)
      .subscribe(prodprov => this.prodprov = prodprov);
  }

  getProdProvImage(): void {
    //const id = this.route.snapshot.paramMap.get('id');
    this.imageUrl = this.prodprovService.getProductImageUrl(this.id)
  }

  goBack(): void {
    this.location.back();
  }

}
