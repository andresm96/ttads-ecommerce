import { Component, OnInit, Input } from '@angular/core';
import { Order } from '../models/order';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})


export class OrderDetailComponent implements OnInit {

  @Input() details: Order[];
  
  constructor() { }

  ngOnInit() {
  }

}
