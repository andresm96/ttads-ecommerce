import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import { Order } from '../models/order';

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

  constructor(/*private customerService: CustomerService*/) { }

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
    //this.getCustomers();
  }

  /*getCustomers(): void {
    this.customerService.getCustomers()
    .map(result => {
      var array = [];
      result.forEach(item => {
        var customer = new Customer();
        customer.id = item._id;
        customer.user = item.user;
        customer.admin = item.admin;
        customer.name = item.name;
        customer.surname = item.surname;
        customer.adress = item.adress;
        customer.birthdate = item.birthdate;
        customer.phone = item.phone;
        customer.city = item.city;
        customer.province = item.province;
        customer.email = item.email;
        array.push(customer);
      });
      return array;
    })
    .subscribe(customers => {
      this.customers= customers;
      this.dtTrigger.next();
    });
  }

  newCustomer(){
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

