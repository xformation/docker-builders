import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyGroupComponent } from './company-group.component';

describe('CompanyGroupComponent', () => {
  let component: CompanyGroupComponent;
  let fixture: ComponentFixture<CompanyGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
