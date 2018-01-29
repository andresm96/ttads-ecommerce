import { OrderDetail } from './order-detail';

export class Order {
    idCustomer: string;
    total: number;
    order: OrderDetail[] = new Array<OrderDetail>();
}