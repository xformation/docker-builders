import { AuthenticationService } from 'src/app/auth/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public badCredentials: boolean;
  public formError: boolean;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService
  ) { }

  ngOnInit() {
    this.authService.logout();
    this.loginForm = this.fb.group({
      usernameOrEmail: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.authService.badCredentials.subscribe(res => {
      this.badCredentials = res;
    })
  }

  login() {
    //this.isUnauthorized = false;
    // console.log(this.loginForm.value);
    if(this.loginForm.valid){
      this.authService.authenticateUser(this.loginForm.value);
    }else{
      this.formError = true;
    }
  }

}
