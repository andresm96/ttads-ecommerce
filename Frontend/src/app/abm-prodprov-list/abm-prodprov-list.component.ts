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
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

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
        }]
    };
    this.getProdProvs();
  }
  
  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  getProdProvs(): void {
    this.prodprovService.getProducts()
    .map(result => {
      var array = [];
      result.forEach(item => {
        var prodprov = new ProdProv();
        prodprov._id = item._id;
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
    });
  }

  delete(prodprov: ProdProv): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      this.prodprovs = this.prodprovs.filter(p => p !== prodprov);
      this.prodprovService.deleteProduct(prodprov).subscribe();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

}
