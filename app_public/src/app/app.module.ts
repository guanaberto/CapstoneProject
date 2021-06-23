import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { FrameworkComponent } from './framework/framework.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { IvyCarouselModule } from 'angular-responsive-carousel';



@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    FrameworkComponent,
    
  ],
  imports: [
    BrowserModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    IvyCarouselModule,
    RouterModule.forRoot([
      {
        path: '',
        component: HomePageComponent
      }
    ]),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [FrameworkComponent]
})
export class AppModule { }
