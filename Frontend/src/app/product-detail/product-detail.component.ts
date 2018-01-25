import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/product';
import { Location } from '@angular/common';

import { ProdProvService }  from '../prodprov.service';
import { ProdProv } from '../models/prod-prov';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

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
    private router: Router,
    private prodprovService: ProdProvService,
    private location: Location
  ) {
    this.router.events.subscribe((val) =>{    
      if(val instanceof NavigationEnd){
        let id = this.route.snapshot.paramMap.get('id');
        this.getProdProv(id);
        this.getProdProvImage(id);
      }
    })
   }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.getProdProv(id);
    this.getProdProvImage(id);
  } 

  getProdProv(id: string): void {
    //const id = this.route.snapshot.paramMap.get('id');
    this.prodprovService.getProduct(id)
      .subscribe(prodprov => this.prodprov = prodprov);
  }

  getProdProvImage(id: string): void {
    //const id = this.route.snapshot.paramMap.get('id');
    this.imageUrl = this.prodprovService.getProductImageUrl(id)
  }

  goBack(): void {
    this.location.back();
  }

}
