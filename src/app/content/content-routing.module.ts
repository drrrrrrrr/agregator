import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ContentComponent} from './content.component';
import {AuthGuard} from '../guard/auth.guard';


const routes: Routes = [
  {path: '', component: ContentComponent},
  {path: 'content', component: ContentComponent, canActivate: [AuthGuard]}
];
@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ContentRoutingModule { }
