import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Product } from '../models/product';
import { TaxesService } from '../services/taxes.service';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let taxesServices : TaxesService;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [TaxesService]

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    taxesServices = TestBed.inject(TaxesService);
    component = fixture.componentInstance;
    let product = new Product();
    let listProduct = Array<Product>();
    listProduct.push(product);
    spyOn(taxesServices, 'loadProducts').and.returnValue(of(listProduct));
    fixture.detectChanges();
  });

  it('should create', () => {

    expect(component).toBeTruthy();

  });

  it('should list product', () => {
    fixture.detectChanges();
    expect(component.listProducts.length > 0).toBeTruthy();

  });

});
