import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsOpeningsComponent } from './accounts-openings.component';

describe('AccountsOpeningsComponent', () => {
  let component: AccountsOpeningsComponent;
  let fixture: ComponentFixture<AccountsOpeningsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountsOpeningsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsOpeningsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
