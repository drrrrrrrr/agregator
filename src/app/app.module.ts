import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ContentModule } from './content/content.module';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import { NotFoundComponent } from './not-found/not-found.component';


import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AuthModule} from './auth/auth.module';
import {UserModule} from './user/user.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NotFoundComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    BrowserModule,
    ContentModule,
    HttpClientModule,
    AppRoutingModule,
    UserModule,
    AuthModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
