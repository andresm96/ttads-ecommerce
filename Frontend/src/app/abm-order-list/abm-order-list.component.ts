import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import { Order } from '../models/order';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-abm-order-list',
  templateUrl: './abm-order-list.component.html',
  styleUrls: ['./abm-order-list.component.css']
})
export class AbmOrderListComponent implements OnInit {

  @ViewChild(DataTableDirective)
  // Must be declared as "any", not as "DataTables.Settings"
  dtOptions: any = {};
  dtElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject();
  onFormActive = false;
  typeForm = 0;
  orderSelected : Order;
  shipped: string = '3';
  
  orders: Order[] = [];
 

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      columnDefs: [
        { 
        orderable: false, 
        searchable: false,
        targets: [5],
      }
    ],
       // Use this attribute to enable the responsive extension
       responsive: true
    
    };
    this.getOrders();
  }

  getOrders(): void {
    this.orderService.getOrders()
    .map(result => {
      var array = [];
      result.forEach(item => {
        var order = new Order();
        order._id = item._id;
        order.idCustomer = item.idCustomer;
        order.shipped = item.shipped;
        order.total = item.total;
        order.order = item.order;
        array.push(order);
      });
      return array;
    })
    .subscribe(orders => {
      this.orders= orders;
      this.dtTrigger.next();
    });
  }

  selectOrder(order: Order): void {
    this.orderSelected = order;
  }

  updateOrder(order: Order): void{
    order.shipped = true;
    this.orderService.updateOrder(order as Order).subscribe(
      data => {
      },
      error => alert(error)
    )
    location.reload();
  }

}

