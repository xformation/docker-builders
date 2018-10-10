import { AuthRouter } from './auth.router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { NgForm, NgModel, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from 'src/app/auth/authentication.service';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  imports: [
    CommonModule,
    AuthRouter,
    ReactiveFormsModule
  ],
  providers: [
    NgForm,
    NgModel,
    FormsModule,
    AuthenticationService
  ],
  declarations: [LoginComponent,SignupComponent ]
})
export class AuthModule { }
