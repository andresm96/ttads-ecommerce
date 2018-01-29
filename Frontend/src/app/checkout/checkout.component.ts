import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from "@angular/core";
import { CartItem } from "../models/cart-item";
import { ProdProv } from "../models/prod-prov";
import { ShoppingCart } from "../models/shopping-cart";
import { Customer } from "../models/customer";
import { Order } from "../models/order";
import { OrderDetail } from "../models/order-detail";
import { ProdProvService } from "../prodprov.service";
import { CustomerService } from "../customer.service";
import { OrderService } from "../order.service";
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

  private needRegister = false;

  confirmPassword = '';
  coincidePasswords = true;
  customer = new Customer();

  order: Order;

  constructor(
    private prodprovService: ProdProvService,
    private shoppingCartService: ShoppingCartService,
    private customerService: CustomerService,
    private orderService: OrderService
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

  //Falta implementar cuanto tengamos listo el registro
  isLogged(){
    return false;
  }

  onCheckChange(eve: any){
    this.needRegister = eve.srcElement.checked
  }


  submitForm(){
    if(this.needRegister){
      if(this.customer.password != this.confirmPassword){
        this.coincidePasswords = false;
      }
      else{
        this.coincidePasswords = true;
        this.saveCustomer();        
      }
    }
    else{
      this.saveOrder();
        }

  }

  saveCustomer(){
    console.log(this.customer);
    this.customer.admin = false;
    this.customerService.addCustomer(this.customer)
                        .subscribe((c) => {
                          this.saveOrder();
                        })
  }

  generateOrder(){
    this.order = new Order();
    this.cartItems.forEach((item) => {
      let od = new OrderDetail();
      od.idProdProv = item.prodprovId;
      od.quantity = item.quantity;
      od.subtotal = item.subtotal;

      this.order.order.push(od);
    })

    this.order.idCustomer = this.customer._id;
    this.cart.subscribe((c) => this.order.total = c.itemsTotal);
  }

  saveOrder(){
    this.generateOrder();
    console.log(this.order);
    this.orderService.addOrder(this.order)
    .subscribe(data => alert(data),
                err => alert(err)
  );
  }
}
