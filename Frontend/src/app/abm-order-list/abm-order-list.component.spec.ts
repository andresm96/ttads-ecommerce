import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmOrderListComponent } from './abm-order-list.component';

describe('AbmOrderListComponent', () => {
  let component: AbmOrderListComponent;
  let fixture: ComponentFixture<AbmOrderListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbmOrderListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbmOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
