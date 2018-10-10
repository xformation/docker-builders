import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationModelDialogComponent } from './confirmation-model-dialog.component';

describe('ConfirmationModelDialogComponent', () => {
  let component: ConfirmationModelDialogComponent;
  let fixture: ComponentFixture<ConfirmationModelDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmationModelDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationModelDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
