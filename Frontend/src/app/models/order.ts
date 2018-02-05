import { OrderDetail } from './order-detail';

export class Order {
    _id: string;
    idCustomer: string;
    total: number;
    order: OrderDetail[] = new Array<OrderDetail>();
}