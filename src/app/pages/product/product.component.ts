import { Component, OnInit } from '@angular/core';
import { ICategoryResponse } from 'src/app/shared/interfaces/category.interface';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/shared/services/product/product.service';
import { IProductResponse } from 'src/app/shared/interfaces/product.interface';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  public userCategory: Array<ICategoryResponse> = [];
  public userProducts: Array<IProductResponse> = [];

  public eventSubscription!: Subscription

  ngOnInit(): void {
    this.getCategory();
    this.getData()
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
