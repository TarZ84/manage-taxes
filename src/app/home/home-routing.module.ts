import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { RecapProductsComponent } from './recap-products/recap-products.component';

const routes: Routes = [
  {
    path:'commande',
    component:HomeComponent
  },
  {
    path:'recap',
    component:RecapProductsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
