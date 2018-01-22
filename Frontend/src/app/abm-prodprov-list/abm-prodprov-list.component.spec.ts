import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmProdprovListComponent } from './abm-prodprov-list.component';

describe('AbmProdprovListComponent', () => {
  let component: AbmProdprovListComponent;
  let fixture: ComponentFixture<AbmProdprovListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbmProdprovListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbmProdprovListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
