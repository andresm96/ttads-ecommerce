import { Injectable } from '@angular/core';
import { StorageService } from "./storage.service";
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";
import { CartItem } from "../models/cart-item";
import { ProdProv } from "../models/prod-prov";
import { ShoppingCart } from "../models/shopping-cart";
import { ProdProvService } from "../prodprov.service";

const CART_KEY = "cart";

@Injectable()
export class ShoppingCartService {

  private storage: Storage;
  private subscriptionObservable: Observable<ShoppingCart>;
  private subscribers: Array<Observer<ShoppingCart>> = new Array<Observer<ShoppingCart>>();
  private prodprovs: ProdProv[];

  constructor(private storageService: StorageService,
              private prodprovService: ProdProvService) {
    this.storage = this.storageService.get();
    this.prodprovService.getProducts().subscribe((products) => this.prodprovs = products);

    this.subscriptionObservable = new Observable<ShoppingCart>((observer: Observer<ShoppingCart>) => {
      this.subscribers.push(observer);
      observer.next(this.retrieve());
      return () =>{
        this.subscribers = this.subscribers.filter((obs) => obs !== observer);
      };
    });
  }

  public get(): Observable<ShoppingCart> {
    return this.subscriptionObservable;
  }

  public addItem(prodprov: ProdProv, quantity: number): void {
    const cart = this.retrieve();
    let item = cart.items.find((p) => p.prodprovId === prodprov._id);
    if(item === undefined){
      item = new CartItem();
      item.prodprovId = prodprov._id;
      cart.items.push(item);
    }
    item.quantity += quantity;
    cart.items = cart.items.filter((cartItem) => cartItem.quantity > 0);

    this.calculateCart(cart);
    this.save(cart);
    this.dispatch(cart);

  }

  public deleteItem(prodprov: ProdProv, quantity: number): void {
    const cart = this.retrieve();
    let item = cart.items.find((p) => p.prodprovId === prodprov._id);
    let index = cart.items.indexOf(item, 0);
    if (index > -1) {
      cart.items.splice(index, 1);
    }

    this.calculateCart(cart);
    this.save(cart);
    this.dispatch(cart);

  }

  public empty(): void{
    const newCart = new ShoppingCart();
    this.save(newCart);
    this.dispatch(newCart);
  }


  private calculateCart(cart: ShoppingCart): void {
    cart.itemsTotal = cart.items
                          .map((item) => item.quantity * this.prodprovs.find((p) => p._id === item.prodprovId).price)
                          .reduce((previous, current) => previous + current, 0);
  }


  private retrieve(): ShoppingCart {
    const cart = new ShoppingCart();
    const storedCart = this.storage.getItem(CART_KEY);
    if (storedCart) {
      cart.updateFrom(JSON.parse(storedCart));
    }
    return cart;
  }

  private save(cart: ShoppingCart): void{
    this.storage.setItem(CART_KEY, JSON.stringify(cart));
  }

  private dispatch(cart: ShoppingCart): void{
    this.subscribers
      .forEach((sub) => {
        try{
          sub.next(cart);
        } catch(e){
          //we want all subscribers to get the update even if one errors
        }
      });
  }


}
