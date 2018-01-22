import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmCategoryListComponent } from './abm-category-list.component';

describe('AbmCategoryListComponent', () => {
  let component: AbmCategoryListComponent;
  let fixture: ComponentFixture<AbmCategoryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbmCategoryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbmCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
