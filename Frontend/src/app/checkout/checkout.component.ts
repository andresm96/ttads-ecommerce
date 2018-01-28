import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from "@angular/core";
import { CartItem } from "../models/cart-item";
import { ProdProv } from "../models/prod-prov";
import { ShoppingCart } from "../models/shopping-cart";
import { ProdProvService } from "../prodprov.service";
import { ShoppingCartService } from "../shopping-cart-services/shopping-cart.service";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import { Location } from '@angular/common';


interface ICartItemWithProduct extends CartItem {
  prodprov: ProdProv;
  totalCost: number;
}


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  public cart: Observable<ShoppingCart>;
  public cartItems: ICartItemWithProduct[];
  public itemCount: number;

  private location: Location;

  private prodprovs: ProdProv[];
  private cartSubscription: Subscription;



  constructor(
    private prodprovService: ProdProvService,
    private shoppingCartService: ShoppingCartService
  ) { }

  ngOnInit() {
    this.cart = this.shoppingCartService.get();
    this.cartSubscription = this.cart.subscribe((cart) => {
    this.itemCount = cart.items.map((x) => x.quantity).reduce((p, n) => p + n, 0);
    this.prodprovService.getProducts().subscribe((prodprov) => {
    this.prodprovs = prodprov;
    this.cartItems = cart.items
        .map((item) => {
          const prodprov = this.prodprovs.find((p) => p._id === item.prodprovId);
          item.subtotal = prodprov.price * item.quantity;
          return {
            ...item,
            prodprov,
            totalCost: prodprov.price * item.quantity
          };
        });
      });
    });
  }

  public ngOnDestroy(): void {
    if(this.cartSubscription){
      this.cartSubscription.unsubscribe();
    }
  }
  public emptyCart() :void {
    this.shoppingCartService.empty();
  }

  goBack(){
    location.replace("/destacados");
  }

  increaseQuantity(prodprov: ProdProv): void {
    this.shoppingCartService.addItem(prodprov, 1);
  }
  
  decreaseQuantity(prodprov: ProdProv): void {
    this.shoppingCartService.addItem(prodprov, -1);
  }

  removeProductFromCart(prodprov: ProdProv): void {
    this.shoppingCartService.deleteItem(prodprov, -1);
  }
}
