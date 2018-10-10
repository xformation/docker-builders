import { Component, OnInit, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { MasterService } from '../master.service';
import { TranslateService } from '@ngx-translate/core';
import '../../../../assets/styles/mainstyles.scss';
import { ConfirmationModelDialogComponent } from '../../../commonComponents/confirmation-model-dialog/confirmation-model-dialog.component';
import * as _ from 'lodash';

@Component({
  selector: 'app-subschedule',
  templateUrl: './subschedule.component.html'
})

export class SubscheduleComponent implements OnInit {

  public scheduleForm: FormGroup;
  private endPoint: string = "subschedules/";
  public subScheduleForm: FormGroup;
  public formRequiredError: boolean = false;
  public formServerError: boolean = false;
  public formSuccess: boolean = false;
  public scFormRequiredError: boolean = false;
  public scFormServerError: boolean = false;
  public scFormSuccess: boolean = false;
  public nameFlag;
  subScheduleList: any = [];
  scheduleList: any = [];
  editSubSchedule: any;
  public selectedSchedule: any;
  scheduleTypes: any;
  modalRef: BsModalRef;
  message: string;
  public deleteFlag: boolean = true;
  public subScheduleListColumns;
  private duplicateSchName: boolean = false;
  private duplicateSchIndex: boolean = false;
  public duplicateMessage: string = null;
  public duplicateMessageParam: string = null;
  @ViewChild('focus') focusField: ElementRef;

  constructor(private fb: FormBuilder,
    private translate: TranslateService,
    private modalService: BsModalService,
    private masterService: MasterService) { translate.setDefaultLang('messages.en'); }

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

    this.subScheduleForm = this.fb.group({
      subScheduleId: [],
      subScheduleName: ['', Validators.required],
      subScheduleIndex: ['', Validators.required],
      scheduleId: [],
      scheduleName: []
    });
    this.loadGriddata();
    this.loadScheduleData();
    this.focusField.nativeElement.focus();
    this.getScheduleTypes();
  }

  loadScheduleData() {
    this.masterService.getParentData("schedules/").subscribe(list => {
      this.scheduleList = list;
    })
  }

  loadGriddata() {
    this.masterService.getData(this.endPoint);
    this.masterService.dataObject.subscribe(list => {
      this.subScheduleList = list;
      localStorage.setItem('rowDataLength', JSON.stringify(this.scheduleList.length));
    })
  }

  onSelectSchedule(event) {
    this.selectedSchedule = event.item;
    const temp = this.selectedSchedule.id;
    const selectedScheduleNameList = _.filter(this.subScheduleList, function(o) { return o.scheduleId == temp });
    this.subScheduleForm.patchValue({ subScheduleIndex: selectedScheduleNameList.length + 1 })
  }

  openModal(template: TemplateRef<any>) {
    this.resetScheduleForm();
    this.scFormRequiredError = this.scFormServerError = this.scFormSuccess = false;
    this.modalRef = this.modalService.show(template, { class: 'modal-md' });
  }

  getScheduleTypes() {
    this.masterService.getLocalJsonData().subscribe(data => {
      data as object[];
      this.scheduleTypes = data["ScheduleTypes"];
      this.subScheduleListColumns = data["SubScheduleListColumns"];
    });
  }

  saveSchedule() {
    if (this.scheduleForm.valid && this.duplicateMessage == null) {
      this.showConfirmationModal("SaveSchedule");
    } else {
      this.scRequiredErrMsg();
    }
  }

  saveScheduleForm() {
    this.masterService.createRecord("schedules/", this.scheduleForm.value).subscribe(res => {

      this.showInformationModal("SaveSchedule");
      this.modalRef.hide();
      this.scheduleForm.reset();
    }, (error) => {
      this.scServerErrMsg();
    });
  }
  resetScheduleForm() {
    this.scheduleForm.reset();
  }

  checkForDuplicateScheduleName() {
    this.duplicateSchName = this.masterService.hasDataExist(this.scheduleList, 'scheduleName', this.scheduleForm.value.scheduleName);
    this.getDuplicateErrorMessages();
  }

  validateFormOnBlur() {
    this.formRequiredError = false;
    this.duplicateSchIndex = this.masterService.hasDataExist(this.scheduleList, 'scheduleIndex', parseInt(this.scheduleForm.value.scheduleIndex));
    this.getDuplicateErrorMessages();
  }

  getDuplicateErrorMessages(): void {
    this.duplicateMessage = null;
    this.duplicateMessageParam = null;
    if (this.duplicateSchName && this.duplicateSchIndex) {
      this.duplicateMessage = "schedule.duplicateErrorMessage";

    } else if (this.duplicateSchIndex) {
      this.duplicateMessage = "schedule.duplicateIndexErrorMessage";
      this.duplicateMessageParam = this.scheduleForm.value.scheduleIndex;

    } else if (this.duplicateSchName) {
      this.duplicateMessage = "schedule.duplicateNameErrorMessage";
      this.duplicateMessageParam = this.scheduleForm.value.scheduleName;
    }
  }

  saveForm() {
    this.subScheduleForm.value.scheduleId = this.selectedSchedule.id;
    if (this.subScheduleForm.value.subScheduleId) {
      this.masterService.updateRecord(this.endPoint, this.subScheduleForm.value).subscribe(res => {
        this.showInformationModal("Save");
      }, (error) => {
        this.serverErrMsg();
      });
    } else {
      this.masterService.createRecord(this.endPoint, this.subScheduleForm.value).subscribe(res => {
        this.showInformationModal("Save");
      }, (error) => {
        this.serverErrMsg();
      });
    }
  }

  save() {
    this.formRequiredError = false;
    if (this.subScheduleForm.valid && this.selectedSchedule && this.selectedSchedule.id) {
      this.showConfirmationModal('Save');
    } else {
      this.requiredErrMsg();
    }
  }

  delete() {
    this.masterService.deleteRecord(this.endPoint, this.editSubSchedule.subScheduleId).subscribe(res => {
      this.showInformationModal("Delete");
    }, (error) => {
      this.serverErrMsg();
    });
    localStorage.removeItem('ag-activeRow');
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

  scRequiredErrMsg() {
    if (this.duplicateMessage == null) {
      this.scFormRequiredError = true;
      this.scFormSuccess = this.scFormServerError = false;
    }
  }

  scServerErrMsg() {
    this.scFormServerError = true;
    this.scFormRequiredError = this.scFormSuccess = false;
  }

  resetForm() {
    this.loadGriddata();
    this.loadScheduleData();
    this.formRequiredError = this.formServerError = this.formSuccess = false;
    this.subScheduleForm.reset();
    this.editSubSchedule = null;
    this.nameFlag = false;
    this.deleteFlag = true;
    this.duplicateMessage = null;
    this.duplicateMessageParam = null;
    this.focusField.nativeElement.focus();
  }

  editable(s) {
    this.nameFlag = true;
    this.editSubSchedule = s;
    this.selectedSchedule = {};
    this.selectedSchedule.id = s.scheduleId;
    this.deleteFlag = false;
    this.duplicateMessage = null;
    this.duplicateMessageParam = null;
    this.subScheduleForm.reset(s);
  }

  showInformationModal(eventType) {
    var msg;
    var title;
    if (eventType === "Delete") {
      msg = 'subschedule.deleteInformationMessage';
      title = 'Sub-Schedule';
    } else if (eventType === "SaveSchedule") {
      title = 'Schedule';
      msg = 'schedule.saveInformationMessage';
    }else {
      title = 'Sub-Schedule';
      msg = 'subschedule.saveInformationMessage';
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
      title = 'Sub-Schedule';
      msg = 'subschedule.deleteConfirmationMessage';
    } else if (eventType === "SaveSchedule") {
      title = 'Schedule';
      msg = 'schedule.saveConfirmationMessage';
    }else {
      title = 'Sub-Schedule';
      msg = 'subschedule.saveConfirmationMessage';
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
        } else if (eventType === "SaveSchedule") {
          this.saveScheduleForm();
        } else {
          this.saveForm();
        }
      }
    });
  }

}
