import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class ProductResolver implements Resolve<boolean> {
  constructor(
    private productService: ProductService
  ){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    return this.productService.getOneFirebase(route.paramMap.get('id') as string);
  }

}
