import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthService} from './auth.service';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AuthRoutingModule} from './auth-routing.module';
import {LoginComponent} from './login/login.component';
import {RegistrationComponent} from './registration/registration.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    AngularFireAuthModule,

  ],
  declarations: [LoginComponent, RegistrationComponent],
  providers: [AuthService]
})
export class AuthModule { }
