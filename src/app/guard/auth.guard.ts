import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from '../auth/auth.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private  auth: AuthService,
              private  router: Router) {}
  canActivate(): Observable<boolean> {
    return this.auth.checkAuth().pipe(map(auth => {
        if (!auth) {
          this.router.navigate(['/login']);
          return false;
        } else {
          return true;
        }
      }
    ));
  }
}
