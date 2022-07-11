import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Product } from '../models/product';
import { TaxesService } from './taxes.service';



describe('TaxesService', () => {
  let service: TaxesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(TaxesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should deduce TVA', () => {
    let product = new Product();
    let tva: number = 0;

    /******* Livre  importé*/
    product.isImported = true;
    product.id = 'lv';
    tva = service.deduceTva(product);
    console.log(tva);
    expect( tva === 0.15).toBeTruthy();

     /******* autre produits non necessaire non importé*/
     product.isImported = false;
     product.isNecessary = false;
     product.id = null;
     tva = service.deduceTva(product);
     console.log(tva);
     expect( tva === 0.2).toBeTruthy();

     /******* autre produits non necessaire importé*/
     product.isImported = true;
     product.isNecessary = false;
     product.id = null;
     tva = service.deduceTva(product);
     console.log(tva);
     expect( tva === 0.25).toBeTruthy();

     /******* autre produits necessaire importé*/
     product.isImported = true;
     product.isNecessary = true;
     product.id = null;
     tva = service.deduceTva(product);
     console.log(tva);
     expect( tva === 0.05).toBeTruthy();

      /******* autre produits necessaire non importé*/
      product.isImported = false;
      product.isNecessary = true;
      product.id = null;
      tva = service.deduceTva(product);
      console.log(tva);
      expect( tva === 0).toBeTruthy();
  });

  it('should roundNumber', () => {
    let value: number = 12.99
    value = service.roundNumber(value);
    expect( value === 13).toBeTruthy();

    value = 12.01
    value = service.roundNumber(value);
    console.log(value);
    expect( value === 12.05).toBeTruthy();

    value = 12.03
    value = service.roundNumber(value);
    console.log(value);
    expect( value === 12.03).toBeTruthy();

    value = 12.04
    value = service.roundNumber(value);
    console.log(value);
    expect( value === 12.04).toBeTruthy();

    value = 12.05
    value = service.roundNumber(value);
    console.log(value);
    expect( value === 12.05).toBeTruthy();

    value = 12.06
    value = service.roundNumber(value);
    console.log(value);
    expect( value === 12.10).toBeTruthy();
  });

  it('should deduceAmountTTCFromTVA', () => {
    //2 x Livres
    let amountTTC: number  = service.deduceAmountTTCFromTVA(12.49, 2, 0.1);
    expect( amountTTC === 27.5).toBeTruthy();

    // 1 x CD
    amountTTC = service.deduceAmountTTCFromTVA(14.99, 1, 0.2);
    expect( amountTTC === 18).toBeTruthy();

    // 3 x barres de chocolat
    amountTTC = service.deduceAmountTTCFromTVA(0.85, 3, 0);
    expect( amountTTC === 2.55).toBeTruthy();

    // 2 x boîtes de chocolats importée
    amountTTC = service.deduceAmountTTCFromTVA(10, 2, 0.05);
    expect( amountTTC === 21).toBeTruthy();

    //3  x flacons de parfum importé
    amountTTC = service.deduceAmountTTCFromTVA(47.5, 3, 0.25);
    expect( amountTTC === 178.15).toBeTruthy();

    //2 x flacons de parfum importé
    amountTTC = service.deduceAmountTTCFromTVA(27.99, 2, 0.25);
    expect( amountTTC === 70).toBeTruthy();

    //1 x flacon de parfum
    amountTTC = service.deduceAmountTTCFromTVA(18.99, 1, 0.2);
    expect( amountTTC === 22.8).toBeTruthy();

    // 3 x  boîtes de pilules contre la migraine
    amountTTC = service.deduceAmountTTCFromTVA(9.75, 3, 0);
    expect( amountTTC === 29.25).toBeTruthy();

    // 2 x  boîtes de chocolats importés
    amountTTC = service.deduceAmountTTCFromTVA(11.25, 2, 0.05);
    expect( amountTTC === 23.65).toBeTruthy();

  });

  it('should calculatePriceTTC', () => {
    let product = new Product();
    // Livre
    product.id = 'lv';
    product.selectedPriceHT = 12.49;
    product.quantity = 2;

    service.calculatePriceTTC(product);

    console.log( 'priceTTC :: ' + product.priceTTC);

    expect( product.priceTTC === 27.5).toBeTruthy();


     // 2 boîtes de chocolats importée
     product = new Product();
     product.isImported = true;
     product.isNecessary = true;
     product.selectedPriceHT = 10;
     product.quantity = 2;

     service.calculatePriceTTC(product);

     console.log( 'priceTTC :: ' + product.priceTTC);

     expect( product.priceTTC === 21).toBeTruthy();

     //@TODO : c'est le même principe pour les autres produits

  });
});
