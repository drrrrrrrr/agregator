import {RouterModule, Routes} from '@angular/router';
import {RegistrationComponent} from './registration/registration.component';
import {LoginComponent} from './login/login.component';
import {NgModule} from '@angular/core';

const routes: Routes = [
    {path: 'registration', component: RegistrationComponent},
    {path: 'login', component: LoginComponent},
];

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class AuthRoutingModule { }
