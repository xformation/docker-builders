import { BsModalRef } from 'ngx-bootstrap/modal';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-confirmation-model-dialog',
  templateUrl: './confirmation-model-dialog.component.html'
})


export class ConfirmationModelDialogComponent   implements OnInit {
    public active: boolean = false;
    public activeInformation: boolean = false;
    public body: string;
    public msgParam: string;
    public title: string;
    public onClose: Subject<boolean>;

    public constructor(
        private _bsModalRef: BsModalRef,
        private translate: TranslateService,
    ) {translate.setDefaultLang('messages.en'); }

    public ngOnInit(): void {
        this.onClose = new Subject();
    }

    public showConfirmationModal(title: string, body: string, color:string, msgParam: string): void {
        this.title = title;
        this.body =  body;
        this.active = true;
        this.msgParam=msgParam;
    }

    public showInformationModal(title: string, body: string, msgParam: string): void {
        this.title = title;
        this.body =  body;
        this.activeInformation = true;
          this.msgParam=msgParam;
    }

    public onConfirm(): void {
        this.active = false;
        this.onClose.next(true);
        this._bsModalRef.hide();
    }

    public onCancel(): void {
        this.active = false;
        this.activeInformation = false;
        this.onClose.next(false);
        this._bsModalRef.hide();
    }

    public hideConfirmationModal(): void {
        this.active = false;
        this.onClose.next(null);
        this._bsModalRef.hide();
    }
}
