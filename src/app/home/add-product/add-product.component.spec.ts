import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AddProductComponent } from './add-product.component';
import { Product } from 'src/app/models/product';

describe('AddProductComponent', () => {
  let component: AddProductComponent;
  let fixture: ComponentFixture<AddProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProductComponent ],
      imports: [ HttpClientTestingModule ]

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check mandatory fields', () => {
    component.addProduct();
    expect(component.errorList.length > 0).toBeTruthy();
  });

  it('should check remove All', () => {
    component.selectedProduct.id = 'lv';
    expect(component.selectedProduct.id === 'lv').toBeTruthy();
    console.log('Before Delete : ' + component.selectedProduct.id);
    component.removeAllProduct();
    console.log('After Delete : ' + component.selectedProduct.id);
    expect(!component.selectedProduct.id).toBeTruthy();
  });

 it('should check Add Product', () => {
    component.selectedProduct.id = 'lv';
    component.selectedProduct.selectedPriceHT = 12.49;
    component.selectedProduct.quantity = 2;
    component.addProduct();
    console.log('After Delete : ' + component.selectedProduct.id);
    expect(component.listSelectedProducts.length == 1 &&
      component.listSelectedProducts[0].priceTTC === 27.5).toBeTruthy();
  });
});
