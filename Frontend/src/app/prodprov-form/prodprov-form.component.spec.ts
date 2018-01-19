import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdprovFormComponent } from './prodprov-form.component';

describe('ProdprovFormComponent', () => {
  let component: ProdprovFormComponent;
  let fixture: ComponentFixture<ProdprovFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdprovFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdprovFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
