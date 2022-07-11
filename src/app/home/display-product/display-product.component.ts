import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { isEmpty } from 'lodash';
import { TaxesService } from 'src/app/services/taxes.service';
import { Observable } from 'rxjs';
import { map} from 'rxjs/operators';
@Component({
  selector: 'app-display-product',
  templateUrl: './display-product.component.html',
  styleUrls: ['./display-product.component.scss']
})
export class DisplayProductComponent implements OnInit {

  isEmptyFct = isEmpty;

  constructor(public sharedService: SharedService, private taxesService: TaxesService) { }

  ngOnInit(): void {
  }

}
