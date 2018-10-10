import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscheduleComponent } from './subschedule.component';

describe('SubscheduleComponent', () => {
  let component: SubscheduleComponent;
  let fixture: ComponentFixture<SubscheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
