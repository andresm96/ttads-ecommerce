import { CartItem } from "./cart-item";


export class ShoppingCart {
  public items: CartItem[] = new Array<CartItem>();
  public idCustomer: string
  public deliveryOptionId: string;
  public grossTotal: number = 0;
  public deliveryTotal: number = 0;
  public itemsTotal: number = 0;
  public quantityItems : number = 0;

  public updateFrom(src: ShoppingCart) {
    this.items = src.items;
    this.idCustomer = src.idCustomer;
    this.deliveryOptionId = src.deliveryOptionId;
    this.grossTotal = src.grossTotal;
    this.deliveryTotal = src.deliveryTotal;
    this.itemsTotal = src.itemsTotal;
    this.quantityItems = src.quantityItems;
  }
}
