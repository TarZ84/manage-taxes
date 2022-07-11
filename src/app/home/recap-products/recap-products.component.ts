import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SharedService } from 'src/app/services/shared.service';
import { TaxesService } from 'src/app/services/taxes.service';
import { isEmpty } from 'lodash';

@Component({
  selector: 'app-recap-products',
  templateUrl: './recap-products.component.html',
  styleUrls: ['./recap-products.component.scss']
})
export class RecapProductsComponent implements OnInit {

  isEmptyFct = isEmpty;

  constructor(public sharedService: SharedService, private taxesService: TaxesService) { }

  ngOnInit(): void {
  }


  /**
   * get total taxes
   * @returns number
   */

   getTotalTaxes(): Observable<number> {
    return this.sharedService.listSelectedProducts$.pipe(
      map ( products => this.taxesService.getTotalTaxes(products)) );
  }

  /**
   * get total prices
   * @returns number
   */

  getTotalPrices(): Observable<number> {

    return this.sharedService.listSelectedProducts$.pipe(
      map ( products => this.taxesService.getTotalPrices(products)) );
  }

}
