import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmListComponent } from './abm-list.component';

describe('AbmListComponent', () => {
  let component: AbmListComponent;
  let fixture: ComponentFixture<AbmListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbmListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbmListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
