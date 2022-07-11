import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Product } from 'src/app/models/product';
import { isEmpty } from 'lodash';
import { SharedService } from 'src/app/services/shared.service';
import { TaxesService } from 'src/app/services/taxes.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  @Input()
  listProducts: Array<Product> = new Array<Product>();
  listSelectedProducts: Array<Product> = new Array<Product>();
  selectedProduct: Product = new Product();
  errorList: Array<string> = new Array<string>();

  constructor(private sharedService: SharedService, private taxesService: TaxesService) { }


  ngOnInit(): void {
    this.removeAllProduct();
  }

  /** add selected product */
  addProduct($event?: any) {
    this.checkMandatoryFields();
    if( isEmpty(this.errorList) ) {

      this.taxesService.calculatePriceTTC(this.selectedProduct);

      if(isEmpty( this.listSelectedProducts )) {
        this.listSelectedProducts.push(this.selectedProduct);
      } else {
        this.listSelectedProducts = this.listSelectedProducts
          .filter( p => p.id !== this.selectedProduct.id);
        this.listSelectedProducts.push(this.selectedProduct);
      }
      this.sharedService.listSelectedProducts$.next(this.listSelectedProducts);
      this.selectedProduct = new Product();
    }

    console.log(JSON.stringify(this.listSelectedProducts));
  }
  /** Reset all */
  removeAllProduct($event?: any){
    this.errorList.length = 0;
    this.listSelectedProducts.length = 0;
    this.selectedProduct = new Product();
    this.sharedService.listSelectedProducts$ = new BehaviorSubject(new Array());

  }

  /** check if mandatory fields are empty */
  private checkMandatoryFields(){
    this.errorList.length = 0;
    if(isEmpty(this.selectedProduct.id)){
      this.errorList.push('Veuillez sélectionner le produit');
    }

    if(!this.selectedProduct.selectedPriceHT){
      this.errorList.push('Veuillez sélectionner le prix');
    }

    if(!this.selectedProduct.quantity){
      this.errorList.push('Veuillez sélectionner la quantité');
    }
  }

}
