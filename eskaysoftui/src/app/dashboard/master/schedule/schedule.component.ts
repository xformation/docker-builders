import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MasterService } from '../master.service';
import '../../../../assets/styles/mainstyles.scss';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ConfirmationModelDialogComponent } from '../../../commonComponents/confirmation-model-dialog/confirmation-model-dialog.component';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html'
})

export class ScheduleComponent implements OnInit {

  public scheduleForm: FormGroup;
  private endPoint: string = "schedules/";
  public scheduleTypes: any = [];
  public formSuccess: boolean = false;
  public formRequiredError: boolean = false;
  public formServerError: boolean = false;
  public scheduleList: any = [];
  public scheduleListColumns;
  public editSchedule;
  public deleteFlag: boolean = true;
  public saveBtnFlag: boolean = false;
  public duplicateMessage: string = null;
  public duplicateMessageParam: string = null;
  public nameFlag;
  public gridDataList: Observable<any[]>;
  public lastSchIndex;
  modalRef: BsModalRef;
  private duplicateSchName: boolean = false;
  private duplicateSchIndex: boolean = false;
  @ViewChild('focus') focusField: ElementRef;

  constructor(private fb: FormBuilder, private modalService: BsModalService, private translate: TranslateService, private masterService: MasterService) {
    translate.setDefaultLang('messages.en');
  }

  valueChange(selectedRow: any[]): void {
    this.editable(selectedRow);
  }

  ngOnInit() {
    this.scheduleForm = this.fb.group({
      id: [],
      scheduleName: ['', Validators.required],
      scheduleIndex: ['', Validators.required],
      scheduleType: ['', Validators.required],
    });
    this.loadGridData();
    this.focusField.nativeElement.focus();
    this.getScheduleTypes();
  }

  validateFormOnBlur() {
    this.formRequiredError = false;
    if (this.lastSchIndex != this.scheduleForm.value.scheduleIndex) {
      this.duplicateSchIndex = this.masterService.hasDataExist(this.scheduleList, 'scheduleIndex', parseInt(this.scheduleForm.value.scheduleIndex));
      this.getDuplicateErrorMessages();
    }
  }

  getDuplicateErrorMessages(): void {
    this.duplicateMessage = null;
    this.duplicateMessageParam = null;
    if (this.duplicateSchName && this.duplicateSchIndex) {
      this.duplicateMessage = "schedule.duplicateErrorMessage";

    } else if (this.duplicateSchIndex) {
      this.duplicateMessage = "schedule.duplicateIndexErrorMessage";
      this.duplicateMessageParam=this.scheduleForm.value.scheduleIndex;

    } else if (this.duplicateSchName) {
      this.duplicateMessage = "schedule.duplicateNameErrorMessage";
      this.duplicateMessageParam=this.scheduleForm.value.scheduleName;
    }
  }

  checkForDuplicateScheduleName() {
    this.duplicateSchName = this.masterService.hasDataExist(this.scheduleList, 'scheduleName', this.scheduleForm.value.scheduleName);
    this.getDuplicateErrorMessages();
  }

  loadGridData() {
    this.masterService.getData(this.endPoint);
    this.masterService.dataObject.subscribe(list => {
      this.scheduleList = list;
      localStorage.setItem('rowDataLength', JSON.stringify(this.scheduleList.length));
    });
  }

  getScheduleTypes() {
    this.masterService.getLocalJsonData().subscribe(data => {
      data as object[];
      this.scheduleTypes = data["ScheduleTypes"];
      this.scheduleListColumns = data["ScheduleListColumns"]
    });
  }

  validateFormOnSave(): boolean {
    if (this.scheduleForm.valid && this.duplicateMessage == null) {
      return true;
    } else {
      this.requiredErrMsg();
      return false;
    }
  }

  save() {
    if (this.scheduleForm.value.id) {
      this.masterService.updateRecord(this.endPoint, this.scheduleForm.value).subscribe(res => {
        this.showInformationModal("Save");
      }, (error) => {
        this.serverErrMsg();
      });
    } else {
      this.masterService.createRecord(this.endPoint, this.scheduleForm.value).subscribe(res => {
        this.showInformationModal("Save");
      }, (error) => {
        this.serverErrMsg();
      });
    }
  }

  saveForm() {
    if (this.scheduleForm.valid && this.duplicateMessage == null) {
      this.showConfirmationModal('Save');
    } else {
      this.requiredErrMsg()
    }
  }

  delete() {
    this.masterService.deleteRecord(this.endPoint, this.editSchedule.id).subscribe(res => {
      localStorage.removeItem('ag-activeRow');
      this.showInformationModal("Delete");
    }, (error) => {
      this.serverErrMsg();
    });
  }

  showInformationModal(eventType) {
    var msg;
    if (eventType === "Delete") {
      msg = 'schedule.deleteInformationMessage';
    } else {
      msg = 'schedule.saveInformationMessage';
    }
    const modal = this.modalService.show(ConfirmationModelDialogComponent);
    (<ConfirmationModelDialogComponent>modal.content).showInformationModal(
      'Schedule',
      msg,
      ''
    );
    (<ConfirmationModelDialogComponent>modal.content).onClose.subscribe(result => { this.successMsg(); });
  }

  showConfirmationModal(eventType): void {
    var msg;
    if (eventType === "Delete") {
      msg = 'schedule.deleteConfirmationMessage';
    } else {
      msg = 'schedule.saveConfirmationMessage';
    }
    const modal = this.modalService.show(ConfirmationModelDialogComponent);
    (<ConfirmationModelDialogComponent>modal.content).showConfirmationModal(
      'Schedule',
      msg,
      'green',
      ''
    );

    (<ConfirmationModelDialogComponent>modal.content).onClose.subscribe(result => {
      if (result) {
        if (eventType === "Delete") {
          this.delete();
        } else {
          this.save();
        }
      }
    });
  }

  successMsg() {
    this.formSuccess = true;
    this.formRequiredError = this.formServerError = false;
    this.resetForm();
  }

  requiredErrMsg() {
    if (this.duplicateMessage == null) {
      this.formRequiredError = true;
      this.formSuccess = this.formServerError = false;
    }
  }

  serverErrMsg() {
    this.formServerError = true;
    this.formRequiredError = this.formSuccess = false;
  }

  resetForm() {
    this.scheduleForm.reset();
    this.editSchedule = null;
    this.deleteFlag = true;
    this.saveBtnFlag = false;
    this.duplicateMessage = null;
    this.duplicateMessageParam = null;
    this.nameFlag = false;
    this.lastSchIndex;
    this.formRequiredError = this.formServerError = this.formSuccess = false;
    this.loadGridData();
    this.focusField.nativeElement.focus();
  }

  editable(s) {
    this.formRequiredError = false;
    this.editSchedule = s;
    this.scheduleForm.reset(s);
    this.lastSchIndex = this.editSchedule.scheduleIndex;
    this.saveBtnFlag = this.deleteFlag = !this.editSchedule.deleteFlag;
    this.duplicateMessage = null;
    this.duplicateMessageParam = null;
    this.nameFlag = true;
  }

}
