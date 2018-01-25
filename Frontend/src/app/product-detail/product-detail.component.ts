import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/product';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ProdProvService }  from '../prodprov.service';
import { ShoppingCartService }  from '../shopping-cart-services/shopping-cart.service';

import { ProdProv } from '../models/prod-prov';

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
  id: string;

  constructor(
    private route: ActivatedRoute,
    private prodprovService: ProdProvService,
    private shoppingCartService: ShoppingCartService,
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
