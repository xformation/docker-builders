import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerwiseDiscountComponent } from './customerwise-discount.component';

describe('CustomerwiseDiscountComponent', () => {
  let component: CustomerwiseDiscountComponent;
  let fixture: ComponentFixture<CustomerwiseDiscountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerwiseDiscountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerwiseDiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
