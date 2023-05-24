import { Component } from '@angular/core';
import { ICategoryResponse } from 'src/app/shared/interfaces/category.interface';
import { IProductResponse } from 'src/app/shared/interfaces/product.interface';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { ProductService } from 'src/app/shared/services/product/product.service';
import { Firestore, doc, docData } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  public userProducts: Array<IProductResponse> = [];
  public userCategory: Array<ICategoryResponse> = [];

  public currentProduct!: IProductResponse;
  public currentCategory!: ICategoryResponse;


  constructor(
    private productService: ProductService,
    private orderService: OrderService,
    private categoryService: CategoryService,
    private activateRoute: ActivatedRoute,
    private afs: Firestore,
  ) { }

  ngOnInit(): void {
    this.getData();
    this.getCategory();
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

  getOneFirebase(id: string) {
    const categoryDocumentReference = doc(this.afs, `categories/${id}`);
    return docData(categoryDocumentReference, { idField: 'id' });
  }

  getOneFirebasePath(path: string) {
    const categoryDocumentReference = doc(this.afs, `categories/${path}`);
    return docData(categoryDocumentReference, { idField: 'path' });
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
