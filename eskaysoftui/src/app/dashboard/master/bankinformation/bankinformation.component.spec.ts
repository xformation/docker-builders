import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BankinformationComponent } from './bankinformation.component';

describe('BankinformationComponent', () => {
  let component: BankinformationComponent;
  let fixture: ComponentFixture<BankinformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankinformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankinformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
