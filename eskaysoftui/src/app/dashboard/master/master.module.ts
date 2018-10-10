import { MasterRouter } from './master.router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleComponent } from './schedule/schedule.component';
import { NgForm, NgModel, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SubscheduleComponent } from './subschedule/subschedule.component';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { AgGridModule } from 'ag-grid-angular';
import { BsDropdownModule } from 'ngx-bootstrap';
import { ModalModule } from 'ngx-bootstrap/modal';

import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClientModule, HttpClient} from '@angular/common/http';

import { SynectiksCommonGridComponent } from '../../commonComponents/synectiks-common-grid/synectiks-common-grid.component';
import { ConfirmationModelDialogComponent } from '../../commonComponents/confirmation-model-dialog/confirmation-model-dialog.component';

import { StatesComponent } from './states/states.component';
import { DistrictsComponent } from './districts/districts.component';
import { AreasComponent } from './areas/areas.component';
import { BusinessexecutivesComponent } from './businessexecutives/businessexecutives.component';
import { BankinformationComponent } from './bankinformation/bankinformation.component';
import { ManufacturerComponent } from './manufacturer/manufacturer.component';
import { CompanyGroupComponent } from './company-group/company-group.component';
import { CompaniesComponent } from './companies/companies.component';
import { ProductGroupComponent } from './product-group/product-group.component';
import { ProductCategoryComponent } from './product-category/product-category.component';
import { ProductComponent } from './product/product.component';
import { AccountsInfoComponent } from './accounts-info/accounts-info.component';
import { AccountsOpeningsComponent } from './accounts-openings/accounts-openings.component';
import { ContactComponent } from './contact/contact.component';
import { CustomerwiseDiscountComponent } from './customerwise-discount/customerwise-discount.component';
import { PurchaseComponent } from './purchase/purchase.component';

@NgModule({
  imports: [
    CommonModule,
    MasterRouter,
    ReactiveFormsModule,
    TypeaheadModule,
    AgGridModule,
    BsDropdownModule,
    FormsModule,
    ModalModule.forRoot(),
    HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        })
  ],
  providers: [NgForm,
    NgModel,
    FormsModule
  ],
  declarations: [ScheduleComponent, SubscheduleComponent, ConfirmationModelDialogComponent, SynectiksCommonGridComponent, StatesComponent, DistrictsComponent, AreasComponent, BusinessexecutivesComponent, BankinformationComponent, ManufacturerComponent, CompanyGroupComponent, CompaniesComponent, ProductGroupComponent, ProductCategoryComponent, ProductComponent, AccountsInfoComponent, AccountsOpeningsComponent, ContactComponent, CustomerwiseDiscountComponent, PurchaseComponent],
  entryComponents: [ ConfirmationModelDialogComponent ]
})
export class MasterModule { }
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}
