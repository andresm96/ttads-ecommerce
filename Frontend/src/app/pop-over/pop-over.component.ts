import { Component, OnInit, Input } from '@angular/core';
import {trigger, state, style, animate, transition } from '@angular/animations';
import { ProdProv } from '../models/prod-prov';
import { ShoppingCart } from "../models/shopping-cart";
import { ShoppingCartService } from "../shopping-cart-services/shopping-cart.service";
import { ProdProvService } from "../prodprov.service";
import { CartItem } from "../models/cart-item";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";



interface ICartItemWithProduct extends CartItem {
  prodprov: ProdProv;
  totalCost: number;
}

@Component({
  selector: 'app-pop-over',
  templateUrl: './pop-over.component.html',
  styleUrls: ['./pop-over.component.css'],
  animations: [
    trigger('popOverState', [
      state('show', style({
        opacity: 1
      })),
      state('hide',   style({
        opacity: 0
      })),
      transition('show => hide', animate('300ms ease-out')),
      transition('hide => show', animate('1000ms ease-in'))
    ])
  ]
})


export class PopOverComponent implements OnInit {
  public cart: Observable<ShoppingCart>;
  private cartSubscription: Subscription;

  private prodprovs: ProdProv[];
  
  
  show = false;

  constructor(private shoppingCartService: ShoppingCartService) { }

  get stateName(){
    return this.show? 'show': 'hide'
  }

  toggle(){
    this.show = !this.show;
  }

  ngOnInit() {
    this.cart = this.shoppingCartService.get();
    this.cartSubscription = this.cart.subscribe((cart) => {
      this.show = true;
      setTimeout(()=>{ this.show = false }, 1500)
      });
  }

}
