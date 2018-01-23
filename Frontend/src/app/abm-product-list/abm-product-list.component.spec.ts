import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmProductListComponent } from './abm-product-list.component';

describe('AbmListComponent', () => {
  let component: AbmProductListComponent;
  let fixture: ComponentFixture<AbmProductListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbmProductListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbmProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
