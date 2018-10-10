import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthenticationService {

  public badCredentials: Subject<boolean> = new Subject<boolean>();
  
  constructor(private http: HttpClient,
    private router: Router) {
  }

  authenticateUser(user) {
    this.http.post(environment.api.url + 'auth/signin', user).subscribe(res => {
      if( res ){
        localStorage.setItem('id_token', JSON.stringify(res));
        this.router.navigate(['dashboard']);
      }
      this.badCredentials.next(false);

    }, (error) => {
      this.badCredentials.next(true);
    });
  }

  getToken() {
    return localStorage.getItem('id_token');
  }

  loggedIn() {
    return tokenNotExpired('id_token');
  }

  logout() {
    localStorage.clear();
  }

}
