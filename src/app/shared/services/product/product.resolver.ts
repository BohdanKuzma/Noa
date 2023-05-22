import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductResolver implements Resolve<boolean> {


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    return this.productService.getOneFirebase(route.paramMap.get('id') as string);
  }

}
