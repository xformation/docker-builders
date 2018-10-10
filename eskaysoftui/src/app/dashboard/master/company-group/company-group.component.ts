import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MasterService } from '../master.service';
import '../../../../assets/styles/mainstyles.scss';

@Component({
  selector: 'app-company-group',
  templateUrl: './company-group.component.html'
})
export class CompanyGroupComponent implements OnInit {

    public companyGroupForm: FormGroup;
    private endPoint: string = "companygroup/";
    public gridDataList: any = [];
    public gridColumnNamesList;
    public gridSelectedRow;
    public formSuccess: boolean = false;
    public formRequiredError: boolean = false;
    public formServerError: boolean = false;
    public nameFlag;
    public deleteFlag: boolean =true;
    public saveBtnFlag: boolean =false;

    @ViewChild('focus') focusField: ElementRef;

    constructor(private fb: FormBuilder, private translate: TranslateService, private masterService: MasterService) {
      translate.setDefaultLang('messages.en');
    }

    ngOnInit() {
      this.companyGroupForm = this.fb.group({
        id: [],
        companyGroup: ['', Validators.required]
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
        this.gridColumnNamesList = data["CompanyGroupColumns"];
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
      if (this.companyGroupForm.valid) {
        if (confirm('Are you sure!!')) {
          if (this.companyGroupForm.value.id) {
            this.masterService.updateRecord(this.endPoint, this.companyGroupForm.value).subscribe(res => {
              this.successMsg();
            }, (error) => {
              this.serverErrMsg();
            });
          } else {
            this.masterService.createRecord(this.endPoint, this.companyGroupForm.value).subscribe(res => {
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
      this.companyGroupForm.reset();
      this.gridSelectedRow = null;
      this.nameFlag = false;
      this.deleteFlag = true;
      this.saveBtnFlag = false;

      this.formRequiredError = this.formServerError = this.formSuccess = false;
      this.loadGridData();
      this.focusField.nativeElement.focus();
    }

    editable(s) {
      this.gridSelectedRow = s;
      this.companyGroupForm.reset(s);
      this.nameFlag = true;
      this.deleteFlag = false;
        this.saveBtnFlag = this.deleteFlag = !this.gridSelectedRow.deleteFlag;
    }

}
