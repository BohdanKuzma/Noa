
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProductResponse } from 'src/app/shared/interfaces/product.interface';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { ProductService } from 'src/app/shared/services/product/product.service';


@Component({
  selector: 'app-thai-market-info',
  templateUrl: './thai-market-info.component.html',
  styleUrls: ['./thai-market-info.component.scss']
})
export class ThaiMarketInfoComponent implements OnInit {


  public currentProduct!: IProductResponse;

  constructor(
    private productService: ProductService,
    private activateRoute: ActivatedRoute,
    private orderService: OrderService,
  ) { }

  ngOnInit(): void {
    this.activateRoute.data.subscribe(data => {
      this.currentProduct = data["productInfo"]
    })
  }

  productCount(product: IProductResponse, value: boolean): void {
    if (value) {
      ++product.count;
    } else if (!value && product.count > 1) {
      --product.count
    }
  }

  addToBasket(product: IProductResponse): void {
    let basket: Array<IProductResponse> = [];
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      basket = JSON.parse(localStorage.getItem('basket') as string);
      if (basket.some(prod => prod.id === product.id)) {
        const index = basket.findIndex(prod => prod.id === product.id);
        basket[index].count += product.count;
      } else {
        basket.push(product)
      }

    } else {
      basket.push(product)
    }
    localStorage.setItem('basket', JSON.stringify(basket))
    product.count = 1;
    this.orderService.changeBasket.next(true)
  }
}
