import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { AddProductComponent } from './add-product/add-product.component';
import { DisplayProductComponent } from './display-product/display-product.component';
import { HomeComponent } from './home.component';
import { FormsModule } from '@angular/forms';
import { RecapProductsComponent } from './recap-products/recap-products.component';

@NgModule({
  declarations: [AddProductComponent, DisplayProductComponent, HomeComponent, RecapProductsComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule
  ],
  providers:[
  ]
})
export class HomeModule { }
