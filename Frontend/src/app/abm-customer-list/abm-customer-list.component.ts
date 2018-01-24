import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Customer } from '../classes/customer';
import { CustomerService } from '../customer.service';

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-abm-customer-list',
  templateUrl: './abm-customer-list.component.html',
  styleUrls: ['./abm-customer-list.component.css']
})
export class AbmCustomerListComponent implements OnInit {

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  onFormActive = false;
  typeForm = 0;
  customerSelected : Customer;

  customers: Customer[] = [];

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      columnDefs: [{ 
        orderable: false, 
        searchable: false, 
        targets: [7] 
      }]
    };
    this.getCustomers();
  }

  getCustomers(): void {
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
  }

}
