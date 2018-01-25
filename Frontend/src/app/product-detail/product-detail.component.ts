import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/product';
import { Location } from '@angular/common';

import { ProdProvService }  from '../prodprov.service';
import { ShoppingCartService }  from '../shopping-cart-services/shopping-cart.service';

import { ProdProv } from '../models/prod-prov';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";


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
    private shoppingCartService: ShoppingCartService,
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

  addProductToCart(prodprov: ProdProv): void {

    this.shoppingCartService.addItem(prodprov, 1);
  }
  
  removeProductFromCart(prodprov: ProdProv): void {
    this.shoppingCartService.addItem(prodprov, -1);
  }

  productInCart(prodprov: ProdProv): void {
    return Observable.create((obs: Observer<boolean>) => {
      const sub = this.shoppingCartService
                      .get()
                      .subscribe((cart) => {
                        obs.next(cart.items.some((i) => i.prodprovId === prodprov._id));
                        obs.complete();
                      });
      sub.unsubscribe();
    });
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
