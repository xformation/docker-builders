import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SynectiksCommonGridComponent } from './synectiks-common-grid.component';

describe('SynectiksCommonGridComponent', () => {
  let component: SynectiksCommonGridComponent;
  let fixture: ComponentFixture<SynectiksCommonGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SynectiksCommonGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SynectiksCommonGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
