import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Provider } from '../models/provider';
import { ProviderService } from '../provider.service';

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-abm-provider-list',
  templateUrl: './abm-provider-list.component.html',
  styleUrls: ['./abm-provider-list.component.css']
})
export class AbmProviderListComponent implements OnInit {

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  providers: Provider[] =[];

  constructor(private providerService: ProviderService) { }

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
    this.getProviders();
  }
  
  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  getProviders(): void {
    this.providerService.getProviders()
    .map(result => {
      var array = [];
      result.forEach(item => {
        var provider = new Provider();
        provider._id = item._id;
        provider.cuit = item.cuit;
        provider.company = item.company;
        provider.adress = item.adress;
        provider.phone = item.phone;
        array.push(provider);
      });
      return array;
    })
    .subscribe(providers => {
      this.providers= providers;
    });
  }

  delete(provider: Provider): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      this.providers = this.providers.filter(p => p !== provider);
      this.providerService.deleteProvider(provider).subscribe();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

}
