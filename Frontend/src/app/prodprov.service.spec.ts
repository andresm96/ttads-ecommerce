import { TestBed, inject } from '@angular/core/testing';

import { ProdProvService } from './prodprov.service';

describe('ProductService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProdProvService]
    });
  });

  it('should be created', inject([ProdProvService], (service: ProdProvService) => {
    expect(service).toBeTruthy();
  }));
});
