import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentComponent } from './content.component';
import {TopContentComponent} from './top-content/top-content.component';
import { MainContentComponent } from './main-content/main-content.component';
import { FooterContentComponent } from './footer-content/footer-content.component';
import {HttpClientModule} from '@angular/common/http';
import {ContentRoutingModule} from './content-routing.module';
import {AuthGuard} from '../guard/auth.guard';
import {ConvertTimePipe} from '../pipes/convert-time.pipe';

@NgModule({
  imports: [
    CommonModule,
    ContentRoutingModule
  ],
  declarations: [ContentComponent, TopContentComponent, MainContentComponent, FooterContentComponent, ConvertTimePipe],
  providers: [HttpClientModule, AuthGuard],
  exports: [ContentComponent]
})
export class ContentModule { }
