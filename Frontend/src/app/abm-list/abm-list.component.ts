import { Component, OnInit } from '@angular/core';
import { ProdProv } from '../models/prod-prov';
import { ProdProvService } from '../prodprov.service';
import { Subject } from 'rxjs/Subject';


import 'rxjs/add/operator/map';

class Person {
  id: number;
  firstName: string;
  lastName: string;
}



@Component({
  selector: 'app-abm-list',
  templateUrl: './abm-list.component.html',
  styleUrls: ['./abm-list.component.css']
})
export class AbmListComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  products: ProdProv[] = [];
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject();

  private dataUrl = 'api/data';  // URL to web api

  constructor(private prodprovService: ProdProvService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this.prodprovService.getProducts().subscribe(products => {
      this.products = products;
      this.dtTrigger.next();
    });
  }

  private extractData(res: Response) {
    const body = res.json();
    return body || {};
  }
}