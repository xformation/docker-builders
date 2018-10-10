import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessexecutivesComponent } from './businessexecutives.component';

describe('BusinessexecutivesComponent', () => {
  let component: BusinessexecutivesComponent;
  let fixture: ComponentFixture<BusinessexecutivesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessexecutivesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessexecutivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
