import { AuthGuard } from './../../security/auth-guard.service';
import { SubscheduleComponent } from './subschedule/subschedule.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { StatesComponent } from './states/states.component';
import { DistrictsComponent } from './districts/districts.component';
import { BusinessexecutivesComponent } from './businessexecutives/businessexecutives.component';
import { AreasComponent } from './areas/areas.component';
import { BankinformationComponent } from './bankinformation/bankinformation.component';
import { ManufacturerComponent } from './manufacturer/manufacturer.component';
import { CompanyGroupComponent } from './company-group/company-group.component';
import { CompaniesComponent } from './companies/companies.component';
import { AccountsOpeningsComponent } from './accounts-openings/accounts-openings.component';
import { ContactComponent } from './contact/contact.component';
import { CustomerwiseDiscountComponent } from './customerwise-discount/customerwise-discount.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { ProductComponent } from './product/product.component';
import { ProductCategoryComponent } from './product-category/product-category.component';
import { ProductGroupComponent } from './product-group/product-group.component';


export const masterRouter: Routes = [
    { path: '', redirectTo: 'schedule', pathMatch: 'full' },
    { path: 'schedule', component: ScheduleComponent, canActivate: [AuthGuard]  },
    { path: 'subschedule', component: SubscheduleComponent, canActivate: [AuthGuard]  },
    { path: 'states', component: StatesComponent, canActivate: [AuthGuard]  },
    { path: 'districts', component: DistrictsComponent, canActivate: [AuthGuard]  },
    { path: 'businessExecutives', component: BusinessexecutivesComponent, canActivate: [AuthGuard]  },
    { path: 'areas', component: AreasComponent, canActivate: [AuthGuard]  },
    { path: 'bankInformation', component: BankinformationComponent, canActivate: [AuthGuard]  },
    { path: 'manufacturer', component: ManufacturerComponent, canActivate: [AuthGuard]  },
    { path: 'companyGroup', component: CompanyGroupComponent, canActivate: [AuthGuard]  },
    { path: 'companies', component: CompaniesComponent, canActivate: [AuthGuard]  },
    { path: 'accountsOpenings', component: AccountsOpeningsComponent, canActivate: [AuthGuard]  },
    { path: 'contact', component: ContactComponent, canActivate: [AuthGuard]  },
    { path: 'customerDiscount', component: CustomerwiseDiscountComponent, canActivate: [AuthGuard]  },
    { path: 'purchase', component: PurchaseComponent, canActivate: [AuthGuard]  },
    { path: 'product', component: ProductComponent, canActivate: [AuthGuard]  },
    { path: 'productCategory', component: ProductCategoryComponent, canActivate: [AuthGuard]  },
    { path: 'productGroup', component: ProductGroupComponent, canActivate: [AuthGuard]  },
    
];

export const MasterRouter: ModuleWithProviders = RouterModule.forChild(masterRouter);
