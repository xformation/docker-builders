import {Injectable} from '@angular/core';
import { Router, CanActivate} from '@angular/router';
import { AuthenticationService } from 'src/app/auth/authentication.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  canActivate() {
    if (this.authService.getToken() && this.authService.loggedIn()) {
      return true;
    } else {
      this.router.navigate(['/auth']);
      return false;
    }
  }
}
