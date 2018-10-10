import { ModalModule } from 'ngx-bootstrap/modal';
import { AuthGuard } from './security/auth-guard.service';
import { BsDropdownModule, TypeaheadModule } from 'ngx-bootstrap';
import { AppRouter } from './app.router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CustomHttpInterceptor } from 'src/app/security/custom-http.interceptor';
import { AgGridModule } from 'ag-grid-angular';
import { AuthenticationService } from './auth/authentication.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRouter,
    HttpClientModule,
    BsDropdownModule.forRoot(),
    TypeaheadModule.forRoot(),
    ModalModule.forRoot(),
    AgGridModule.withComponents([])
  ],
  providers: [CustomHttpInterceptor,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomHttpInterceptor,
      multi: true
    },
    AuthenticationService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
