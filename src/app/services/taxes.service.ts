import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../models/constants';
import { Product } from '../models/product';
import { sum, inRange, sumBy} from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class TaxesService {


  constructor(private httpClient: HttpClient) { }

  /**
   * Load Products Data
   * @returns Observable of Array<Product>
   */
  public loadProducts(): Observable<Array<Product>> {
      return this.httpClient.get<Array<Product>>(Constants.PRODUCT_DATA_URL);
  }
  /**
   * Calculate TTC Price
   * @param product product
   */
  public calculatePriceTTC(product: Product): void {

    let tva = this.deduceTva(product);
    product.taxeAppliquee =  tva * product.selectedPriceHT;
    product.priceTTC = this.deduceAmountTTCFromTVA(product.selectedPriceHT, product.quantity, tva)
  }

  /** Calculate TVA */
  public deduceTva (product: Product) {
    let tva: number = product.isImported ? Constants.TVA_IMPORT : 0;
    //Livres
    if( product.id === 'lv' ) {
      tva = Number(tva + Constants.TVA_LIVRE) ;
    }// Autres non necessaires
    else if( !product.isNecessary ) {
      tva += Constants.TVA_AUTRE;
    }
    return Math.trunc(tva * 100)/100;// avoid 0000002

  }

  /**
   *
   * @param priceHt Calculate Amount TTC
   * @param quantity qauntity
   * @param tva tva
   * @returns amount TTC
   */
   public deduceAmountTTCFromTVA(priceHt: number, quantity: number, tva: number):number {
   return this.roundNumber(sum([+priceHt,+ priceHt * tva]) * quantity );
  }

  /**
   * Rounding Number
   * @param value  number
   * @returns  number
   */
  public roundNumber(value: number ): number {

    // Transformer en entier without decimal ex. : 15.66 => 1566
    let newValue: number = value * 100;

    if(inRange((newValue % 10),1,3) ) {
      return Number((newValue + (5-(newValue % 10)))/100);
    } else if(inRange((newValue % 10),6,10)) {
      return Number((newValue + (10-(newValue % 10)))/100);
    }
    return (newValue/100);

  }

  /**
   * get total prices
   * @returns numbrt
   */

   public getTotalPrices(products: Array<Product>): number {
     return this.roundNumber( sumBy(products,(p)=> p.priceTTC));
  }

  /**
   * get total taxes
   * @returns numbrt
   */

   public getTotalTaxes(products: Array<Product>): number {
    return this.roundNumber( sumBy(products,(p)=> p.taxeAppliquee * p.quantity));
 }

}
