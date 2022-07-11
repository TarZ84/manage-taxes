import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { TaxesService } from '../services/taxes.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public listProducts: Array<Product> = new Array<Product>();

  constructor(private taxesServices: TaxesService) { }

  ngOnInit(): void {
    this.taxesServices.loadProducts().subscribe (products => {
      this.listProducts = products;

    });
  }

}
