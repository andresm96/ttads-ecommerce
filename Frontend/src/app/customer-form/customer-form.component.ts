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
  newcustomer = { _id: '',
                  birthdate: null,
                  admin: false
                 };
  uploadCustomer = 0;
  
  provinces = new Array('Buenos Aires', 'Catamarca', 'Chaco', 'Chubut', 'Córdoba', 'Corrientes', 'Entre Ríos', 'Formosa', 'Jujuy', 'La Pampa', 'La Rioja', 'Mendoza', 'Misiones', 'Neuquén', 'Río Negro', 'Salta', 'San Juan', 'San Luis', 'Santa Cruz', 'Santa Fe', 'Santiago del Estero', 'Tierra del Fuego', 'Tucumán');


  constructor(private customerService: CustomerService, private route: ActivatedRoute) { }

  ngOnInit() {

    if(this.customer != null){
      let localDate = new Date(this.customer.birthdate);
      let localTime = localDate.getTime();
      let localOffset = localDate.getTimezoneOffset()*60000;
      this.customer.birthdate = new Date(localTime + localOffset);
      this.newcustomer = this.customer;
    }

  }

  saveCustomer() {
    this.ConvertDate();
    this.customerService.addCustomer(this.newcustomer as Customer)
    .subscribe(
      data => {
        this.uploadCustomer = 1;
      },
      error => alert(error)
    );
  }

  updateCustomer(){
    this.ConvertDate();
    this.newcustomer._id = this.customer._id;
    this.customerService.updateCustomer(this.newcustomer as Customer)
    .subscribe(
      data => {
        this.uploadCustomer = 1;
      },
      error => alert(error)
    )
  }

  deleteCustomer(){
    this.customerService.deleteCustomer(this.customer)
    .subscribe(
      data => {
        this.uploadCustomer = 1;
      },
      error => alert(error)
    )
  }

  ConvertDate(){
    let localDate = new Date(this.newcustomer.birthdate);
    let localTime = localDate.getTime();
    let localOffset = localDate.getTimezoneOffset()*60000;
    this.newcustomer.birthdate = new Date(localTime + localOffset);
  }

  refresh(){
    location.reload();
  }
}
