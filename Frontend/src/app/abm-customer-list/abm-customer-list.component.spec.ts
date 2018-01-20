import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmCustomerListComponent } from './abm-customer-list.component';

describe('AbmCustomerListComponent', () => {
  let component: AbmCustomerListComponent;
  let fixture: ComponentFixture<AbmCustomerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbmCustomerListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbmCustomerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
