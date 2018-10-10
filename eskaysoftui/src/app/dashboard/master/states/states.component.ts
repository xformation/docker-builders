import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { TranslateService } from '@ngx-translate/core';
import { MasterService } from '../master.service';
import '../../../../assets/styles/mainstyles.scss';
import { ConfirmationModelDialogComponent } from '../../../commonComponents/confirmation-model-dialog/confirmation-model-dialog.component';
import * as _ from 'lodash';

@Component({
  selector: 'app-states',
  templateUrl: './states.component.html'
})
export class StatesComponent implements OnInit {

  public statesForm: FormGroup;
  //private endPoint: string = "states/";
  public formSuccess: boolean = false;
  public isduplicate: boolean = false;
  public formRequiredError: boolean = false;
  public formServerError: boolean = false;
  public statesList: any = [];
  public statesListColumns;
  public editStates;
  public deleteFlag: boolean =true;
  public saveBtnFlag: boolean =false;
  public nameFlag;
  modalRef: BsModalRef;
  message: string;


  @ViewChild('focus') focusField: ElementRef;

  constructor(private fb: FormBuilder,
     private translate: TranslateService,
     private modalService: BsModalService,
      private masterService: MasterService) { translate.setDefaultLang('messages.en');

  }

  valueChange(selectedRow: any[]): void {
    this.editable(selectedRow);
  }

  ngOnInit() {
    this.statesForm = this.fb.group({
      id: [],
      stateName: ['', Validators.required],
      stateCode: ['', Validators.required],
      zone: ['', Validators.required],
    });

    this.loadGridData();
    this.focusField.nativeElement.focus();
    this.getStatesTypes();
  }

  loadGridData() {
    this.masterService.getData("states/");
    this.masterService.dataObject.subscribe(list => {
      this.statesList = list;
      localStorage.setItem('rowDataLength', JSON.stringify(this.statesList.length));
    });
  }

  getStatesTypes() {
    this.masterService.getLocalJsonData().subscribe(data => {
       data as object [];
        this.statesListColumns = data["StateListColumns"]
    });
  }

  saveState() {
    this.formRequiredError = false;
    if (this.statesForm.valid && !this.verifyStatesDuplicates() ) {
      this.showConfirmationModal("Save");
    } else {
      this.duplicateMsg()
    }
  }
  
  save() {
    if (this.statesForm.valid && !this.verifyStatesDuplicates()) {
      //this.showConfirmationModal("Save");
      
        if (this.statesForm.value.id) {
          this.masterService.updateRecord('states/', this.statesForm.value).subscribe(res => {
            this.showInformationModal("Save");
          }, (error) => {
            this.serverErrMsg();
          });
        } else {
          this.masterService.createRecord('states/', this.statesForm.value).subscribe(res => {
           // this.showConfirmationModal("Save");
            this.showInformationModal("Save");
          }, (error) => {
            this.serverErrMsg();
          });
        }
    } else {
      this.duplicateMsg()
    }
  }


  verifyStatesDuplicates(){
    let stateNameList = this.statesList.map((item)=>{return item.stateName});
    let isDuplicate = this.masterService.verifyDuplicates(stateNameList, this.statesForm.value.stateName, true);
    if(!isDuplicate){
      let stateNameList = this.statesList.map((item)=>{return item.stateCode});
      isDuplicate = this.masterService.verifyDuplicates(stateNameList, parseInt(this.statesForm.value.stateCode), false);
    }
    return isDuplicate;    
  }

  delete() {

      this.masterService.deleteRecord('states/', this.editStates.id).subscribe(res => {
        this.showInformationModal("Delete");
        localStorage.removeItem('ag-activeRow');
        this.successMsg()
      }, (error) => {
        this.serverErrMsg();
      });  
  }

  successMsg() {
    this.formSuccess = true;
    this.formRequiredError = this.formServerError = this.isduplicate = false;
    this.resetForm();
  }

  requiredErrMsg() {
    this.formRequiredError = true;
    this.formSuccess = this.formServerError = this.isduplicate = false;
  }

  serverErrMsg() {
    this.formServerError = true;
    this.formRequiredError = this.formSuccess = this.isduplicate = false;
  }

  duplicateMsg() {
    this.isduplicate = true;
    this.formRequiredError = this.formServerError = this.formSuccess = false;    
  }

  resetForm() {
    this.statesForm.reset();
    this.editStates = null;
    this.deleteFlag = true;
    this.saveBtnFlag = false;
    this.nameFlag = false;
    this.formRequiredError = this.formServerError = this.formSuccess = this.isduplicate = false;
    this.loadGridData();
    this.focusField.nativeElement.focus();
  }

  editable(s) {
    this.editStates = s;
    this.statesForm.reset(s);
    this.saveBtnFlag = this.deleteFlag = !this.editStates.deleteFlag;
    this.nameFlag = true;
  }

  
  showInformationModal(eventType) {
    var msg;
    var title;
    if (eventType === "Delete") {
      msg = 'states.deleteInformationMessage';
      title = 'State';
    } else if (eventType === "Save") {
      title = 'State';
      msg = 'states.saveInformationMessage';
    }
    const modal = this.modalService.show(ConfirmationModelDialogComponent);
    (<ConfirmationModelDialogComponent>modal.content).showInformationModal(
      title,
      msg,
      ''
    );
    (<ConfirmationModelDialogComponent>modal.content).onClose.subscribe(result => { this.successMsg(); });
  }

  showConfirmationModal(eventType): void {
    var msg;
    var title;
    if (eventType === "Delete") {
      title = 'State';
      msg = 'states.deleteConfirmationMessage';
    } else if (eventType === "Save") {
      title = 'State';
      msg = 'states.saveConfirmationMessage';
    }
    const modal = this.modalService.show(ConfirmationModelDialogComponent);
    (<ConfirmationModelDialogComponent>modal.content).showConfirmationModal(
      title,
      msg,
      'green',
      ''
    );

    (<ConfirmationModelDialogComponent>modal.content).onClose.subscribe(result => {
      if (result) {
        if (eventType === "Delete") {
          this.delete();
        }  else {
          this.save();
        }
      }
    });
  }
  

}
