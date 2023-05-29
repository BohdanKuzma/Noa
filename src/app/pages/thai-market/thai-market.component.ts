import { Component, OnInit } from '@angular/core';
import { ICategoryResponse } from 'src/app/shared/interfaces/category.interface';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/shared/services/product/product.service';
import { IProductResponse } from 'src/app/shared/interfaces/product.interface';

@Component({
  selector: 'app-thai-market',
  templateUrl: './thai-market.component.html',
  styleUrls: ['./thai-market.component.scss']
})
export class ThaiMarketComponent implements OnInit {

  public userCategory: Array<ICategoryResponse> = [];
  public userProducts: Array<IProductResponse> = [];

  public eventSubscription!: Subscription
  public currentCategoryName!: string;

  ngOnInit(): void {
  }

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.eventSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.getData()
      }
    })
  }

  getData(): void {
    const categoryName = this.activatedRoute.snapshot.paramMap.get('category') as string;
    this.productService.getAllFirebase().subscribe(data => {
      let categoryProducts = data.filter(item => item['category']['path'] == categoryName)
      this.userProducts = categoryProducts as IProductResponse[]
    })
    if (categoryName == 'thai-satay') {
      this.currentCategoryName = 'Thai Salaty'
    }
    else if (categoryName == 'thai-lava-grill') {
      this.currentCategoryName = 'Thai Laga Grill'
    }
    else if (categoryName == 'thai-wok') {
      this.currentCategoryName = 'Thai Wok'
    }
  }

  getCategory(): void {
    this.categoryService.getAllFirebase().subscribe(data => {
      this.userCategory = data as ICategoryResponse[]
    })
  }

  
  productCount(product: IProductResponse, value: boolean): void {
    if (value) {
      ++product.count;
    } else if (!value && product.count > 1) {
      --product.count
    }
  }
}



