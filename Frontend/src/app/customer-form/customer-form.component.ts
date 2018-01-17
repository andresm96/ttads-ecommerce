import { Component, OnInit, Input } from '@angular/core';
import { Customer } from '../models/customer';
import { CustomerService } from '../customer.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent implements OnInit {

  @Input() typeForm: any;
  @Input() customer: Customer;
  newcustomer = { _id: ''};
  
  constructor(private customerService: CustomerService, private route: ActivatedRoute) { }

  ngOnInit() {

  }

  saveCustomer() {
    this.customerService.addCustomer(this.newcustomer as Customer)
    .subscribe(
      data => alert(data),
      error => alert(error)
    );
  }

  updateCustomer(){
    this.newcustomer._id = this.customer._id;
    this.customerService.updateCustomer(this.newcustomer as Customer)
    .subscribe(
      data => alert(data),
      error => alert(error)
    )
  }

  deleteCustomer(){
    this.customerService.deleteCustomer(this.customer)
    .subscribe(
      data => alert(data),
      error => alert(error)
    )
  }


}
