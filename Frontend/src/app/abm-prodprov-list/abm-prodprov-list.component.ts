import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { ProdProv } from '../models/prod-prov';
import { ProdProvService } from '../prodprov.service';

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-abm-prodprov-list',
  templateUrl: './abm-prodprov-list.component.html',
  styleUrls: ['./abm-prodprov-list.component.css']
})
export class AbmProdprovListComponent implements OnInit {

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();
  onFormActive = false;
  typeForm = 0;
  prodprovSelected: ProdProv;

  prodprovs: ProdProv[] =[];

  constructor(private prodprovService: ProdProvService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      columnDefs: [{ 
        orderable: false, 
        searchable: false, 
        targets: [4] 
        }],
      responsive: true
    };
    this.getProdProvs();
  }
  
  getProdProvs(): void {
    this.prodprovService.getProducts()
    .map(result => {
      var array = [];
      result.forEach(item => {
        var prodprov = new ProdProv();
        prodprov._id = item._id;
        prodprov.name = item.name;
        prodprov.price = item.price;
        prodprov.idProduct = item.idProduct;
        prodprov.idProvider = item.idProvider;
        prodprov.description = item.description || 'Sin descripcion';
        array.push(prodprov);
      });
      return array;
    })
    .subscribe(prodprovs => {
      this.prodprovs= prodprovs;
      this.dtTrigger.next();
    });
  }

  newProdProv(){
    this.onFormActive = true;
    this.typeForm = 1;
  }

  updateProdProv(prodprov: ProdProv){
    this.prodprovSelected = prodprov;
    this.onFormActive = true;
    this.typeForm = 2;
  }

  deleteProdProv(prodprov: ProdProv){
    this.prodprovSelected = prodprov;
    this.onFormActive = true;
    this.typeForm = 3;
  }

}
