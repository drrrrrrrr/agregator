import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {from} from 'rxjs';
import { Router} from '@angular/router';
import {tap} from 'rxjs/operators';

@Injectable()
export class AuthService {
  constructor(private afAuth: AngularFireAuth,
              private route: Router
            ) { }
  login(email: string, password: string) {
      return from(this.afAuth.auth.signInWithEmailAndPassword(email, password));
  }
  checkAuth() {
    return this.afAuth.authState;
  }
  logOff() {
    return from(this.afAuth.auth.signOut()).pipe(tap(x => this.route.navigate(['/login'])));
  }
  createUser(email: string, password: string) {
   return from(this.afAuth.auth.createUserWithEmailAndPassword(email, password));
  }
}
