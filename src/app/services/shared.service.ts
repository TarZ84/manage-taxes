import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  listSelectedProducts$: BehaviorSubject<Array<Product>> = new BehaviorSubject(new Array());

  constructor() { }
}
