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
    private activateRoute: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
  ) {
    this.eventSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.getData()
      }
    })
  }

  getData(): void {
    this.productService.getAllFirebase().subscribe(data => {
      this.userProducts = data as IProductResponse[]
    })
  }

  getCategory(): void {
    this.categoryService.getAllFirebase().subscribe(data => {
      this.userCategory = data as ICategoryResponse[]
    })
  }
}
