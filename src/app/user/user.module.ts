import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserSaveComponent } from './user-save/user-save.component';
import {UserRoutingModule} from './user-routing.module';
import {UserPanelComponent} from './user-panel/user-panel.component';
import {UserComponent} from './user.component';
import {AngularFirestore} from '@angular/fire/firestore';
import { UserCategoryService} from './user-category.service';
import {FormsModule} from '@angular/forms';
import {FlashMessagesModule} from 'angular2-flash-messages';
import {ExitPanelGuard} from './exitPanel.guard';
import {UserArticleService} from './user-article.service';
import { UserSaveArticleComponent } from './user-save/user-save-article/user-save-article.component';
import { UserGraphComponent } from './user-graph/user-graph.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {ConvertTimePipe} from '../pipes/convert-time.pipe';

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    FlashMessagesModule.forRoot(),
    BrowserAnimationsModule,
    NgxChartsModule
  ],
  declarations: [UserSaveComponent, UserPanelComponent, UserComponent, UserSaveArticleComponent, UserGraphComponent],
  providers: [AngularFirestore, UserCategoryService, ExitPanelGuard, UserArticleService]
})
export class UserModule { }
