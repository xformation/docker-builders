import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsInfoComponent } from './accounts-info.component';

describe('AccountsInfoComponent', () => {
  let component: AccountsInfoComponent;
  let fixture: ComponentFixture<AccountsInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountsInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
