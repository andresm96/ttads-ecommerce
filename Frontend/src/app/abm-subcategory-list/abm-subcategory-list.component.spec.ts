import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmSubcategoryListComponent } from './abm-subcategory-list.component';

describe('AbmSubcategoryListComponent', () => {
  let component: AbmSubcategoryListComponent;
  let fixture: ComponentFixture<AbmSubcategoryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbmSubcategoryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbmSubcategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
