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
        targets: [7],
      }
    ],
       // Use this attribute to enable the responsive extension
       responsive: true
    };
    this.getOrders();
    console.log(this.orders);
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

  /*newCustomer(){
    this.onFormActive = true;
    this.typeForm = 1;
  }

  updateCustomer(customer: Customer){
    this.customerSelected = customer;
    this.onFormActive = true;
    this.typeForm = 2;
  }

  deleteCustomer(customer: Customer){
    this.customerSelected = customer;
    this.onFormActive = true;
    this.typeForm = 3;
  }*/

}

