import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecapProductsComponent } from './recap-products.component';

describe('RecapProductsComponent', () => {
  let component: RecapProductsComponent;
  let fixture: ComponentFixture<RecapProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecapProductsComponent ],
      imports: [ HttpClientTestingModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecapProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
