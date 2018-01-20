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

  customers: Customer[] = [];

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      columnDefs: [{ 
        orderable: false, 
        searchable: false, 
        targets: [6] 
        }]
    };
    this.getCustomers();
  }
  
  ngAfterViewInit(): void {
    this.dtTrigger.next();
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
    });
  }

  delete(customer: Customer): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      this.customers = this.customers.filter(c => c !== customer);
      this.customerService.deleteCustomer(customer).subscribe();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

}
