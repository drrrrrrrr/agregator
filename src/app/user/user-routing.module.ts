import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {UserPanelComponent} from './user-panel/user-panel.component';
import {UserSaveComponent} from './user-save/user-save.component';
import {UserComponent} from './user.component';
import {AuthGuard} from '../guard/auth.guard';
import {ExitPanelGuard} from './exitPanel.guard';
import {UserGraphComponent} from './user-graph/user-graph.component';
import {NextContentComponent} from '../content/next-content/next-content.component';

const routes: Routes = [
  {path: 'subscribe', component: UserPanelComponent , canActivate: [AuthGuard], canDeactivate: [ExitPanelGuard]},
  {path: 'save', component: UserSaveComponent , canActivate: [AuthGuard]},
  {path: 'graph', component: UserGraphComponent , canActivate: [AuthGuard]},
  {path: 'user', component: UserComponent , canActivate: [AuthGuard]},
  {path: 'save/article/:id', component: NextContentComponent , canActivate: [AuthGuard]}
];

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class UserRoutingModule { }
