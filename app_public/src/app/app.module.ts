import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { FrameworkComponent } from './framework/framework.component';
import { ExtraOptions, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';

import { IvyCarouselModule } from 'angular-responsive-carousel';
import { CouponsComponent } from './coupons/coupons.component';
import { SignupComponent } from './signup/signup.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { ShoppinglistComponent } from './shoppinglist/shoppinglist.component';
import { ProductlistComponent } from './productlist/productlist.component';
import { ProducteditComponent } from './productedit/productedit.component';
import { MatSelectModule } from '@angular/material/select';
import { FlexLayoutModule } from '@angular/flex-layout';






const routerOptions: ExtraOptions = {
  useHash: false,
  anchorScrolling: 'enabled'
}

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    FrameworkComponent,
    CouponsComponent,
    SignupComponent,
    LoginComponent,
    ShoppinglistComponent,
    ProductlistComponent,
    ProducteditComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSnackBarModule,
    MatTableModule,
    MatOptionModule,
    MatSelectModule,
    IvyCarouselModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    RouterModule.forRoot([
      {
        path: '',
        component: HomePageComponent
      },
      {
        path: 'coupons',
        component: CouponsComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'signup',
        component: SignupComponent
      },
      {
        path: 'shoppinglist',
        component: ShoppinglistComponent
      },
      {
        path: 'productlist',
        component: ProductlistComponent
      },
      {
        path: 'productedit/:id',
        component: ProducteditComponent
      },
      {
        path: 'productedit',
        component: ProducteditComponent
      }
    ], routerOptions),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [FrameworkComponent]
})
export class AppModule { }
