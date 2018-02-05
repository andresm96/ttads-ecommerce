import { OrderDetail } from './order-detail';
import { Customer } from '../models/customer';

export class Order {
    _id: string;
    idCustomer: Customer;
    shipped: boolean;
    total: number;
    order: OrderDetail[] = new Array<OrderDetail>();
}