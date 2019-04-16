import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ContentComponent} from './content.component';
import {AuthGuard} from '../guard/auth.guard';
import {NextContentComponent} from './next-content/next-content.component';


const routes: Routes = [
  {path: '', component: ContentComponent},
  {path: 'content/:id', component: NextContentComponent, pathMatch: 'full'},
  {path: 'article/:id' , component: NextContentComponent, pathMatch: 'full'},
  {path: 'content', component: ContentComponent, canActivate: [AuthGuard]},
  {path: 'content/content/:id', pathMatch: 'full', redirectTo: 'content/:id'},

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
