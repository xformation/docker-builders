import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MasterService } from '../master.service';
import '../../../../assets/styles/mainstyles.scss';

@Component({
  selector: 'app-bankinformation',
  templateUrl: './bankinformation.component.html'
})
export class BankinformationComponent implements OnInit {

  public bankInformationForm: FormGroup;
  private endPoint: string = "bankinformation/";
  public gridDataList: any = [];
  public gridColumnNamesList;
  public gridSelectedRow;
  public formSuccess: boolean = false;
  public formRequiredError: boolean = false;
  public formServerError: boolean = false;
  public nameFlag;
  public deleteFlag: boolean =true;
  @ViewChild('focus') focusField: ElementRef;

  constructor(private fb: FormBuilder, private translate: TranslateService, private masterService: MasterService) {
    translate.setDefaultLang('messages.en');
  }

  ngOnInit() {
    this.bankInformationForm = this.fb.group({
      id: [],
      name: ['', Validators.required],
      address: ['', Validators.required]
    });
    this.loadGridData();
    this.getGridCloumsList();
    this.focusField.nativeElement.focus();
  }

  valueChange(selectedRow: any[]): void {
    this.editable(selectedRow);
  }

  getGridCloumsList() {
    this.masterService.getLocalJsonData().subscribe(data => {
      data as object[];
      this.gridColumnNamesList = data["BankInformationColumns"];
    });
  }

  loadGridData() {
    this.masterService.getData(this.endPoint);
    this.masterService.dataObject.subscribe(list => {
      this.gridDataList = list;
      localStorage.setItem('rowDataLength', JSON.stringify(this.gridDataList.length));
    });
  }

  save() {
    if (this.bankInformationForm.valid) {
      if (confirm('Are you sure!!')) {
        if (this.bankInformationForm.value.id) {
          this.masterService.updateRecord(this.endPoint, this.bankInformationForm.value).subscribe(res => {
            this.successMsg();
          }, (error) => {
            this.serverErrMsg();
          });
        } else {
          this.masterService.createRecord(this.endPoint, this.bankInformationForm.value).subscribe(res => {
            this.successMsg();
          }, (error) => {
            this.serverErrMsg();
          });
        }
      }
    } else {
      this.requiredErrMsg()
    }
  }

  delete() {
    if (confirm('Are you sure!!')) {
      this.masterService.deleteRecord(this.endPoint, this.gridSelectedRow.id).subscribe(res => {
        localStorage.removeItem('ag-activeRow');
        this.successMsg()
      }, (error) => {
        this.serverErrMsg();
      });
    }
  }

  successMsg() {
    this.formSuccess = true;
    this.formRequiredError = this.formServerError = false;
    this.resetForm();
  }

  requiredErrMsg() {
    this.formRequiredError = true;
    this.formSuccess = this.formServerError = false;
  }

  serverErrMsg() {
    this.formServerError = true;
    this.formRequiredError = this.formSuccess = false;
  }

  resetForm() {
    this.bankInformationForm.reset();
    this.gridSelectedRow = null;
    this.nameFlag = false;
    this.formRequiredError = this.formServerError = this.formSuccess = false;
    this.loadGridData();
    this.deleteFlag = true;
    this.focusField.nativeElement.focus();
  }

  editable(s) {
    this.gridSelectedRow = s;
    this.bankInformationForm.reset(s);
    this.nameFlag = true;
    this.deleteFlag = false;
  }

}
