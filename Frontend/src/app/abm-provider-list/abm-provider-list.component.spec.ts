import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmProviderListComponent } from './abm-provider-list.component';

describe('AbmProviderListComponent', () => {
  let component: AbmProviderListComponent;
  let fixture: ComponentFixture<AbmProviderListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbmProviderListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbmProviderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
