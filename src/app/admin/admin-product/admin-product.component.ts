import { Component, OnInit } from '@angular/core';
import { deleteObject, getDownloadURL, percentage, ref, uploadBytesResumable, Storage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ToastrService } from 'ngx-toastr';
import { ICategoryResponse } from 'src/app/shared/interfaces/category.interface';
import { IProductResponse } from 'src/app/shared/interfaces/product.interface';
import { CategoryService } from 'src/app/shared/services/category/category.service';

import { ImageService } from 'src/app/shared/services/image/image.service';
import { ProductService } from 'src/app/shared/services/product/product.service';


@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss']
})
export class AdminProductComponent {
  public adminCategories: Array<ICategoryResponse> = [];
  public adminProducts: Array<IProductResponse> = [];

  public productForm!: FormGroup;

  public editStatus = false;

  public uploadPercent!: number;

  public isUploaded = false;

  public currentID!: number | string; // 0

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private imageService: ImageService,
    // private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadCategory()
    this.loadProduct()
    this.initProductForm()
  }

  loadProduct(): void {
    this.productService.getAllFirebase().subscribe(data => {
      this.adminProducts = data as IProductResponse[];
    })
  }

  loadCategory(): void {
    this.categoryService.getAllFirebase().subscribe(data => {
      this.adminCategories = data as ICategoryResponse[];
      this.productForm.patchValue({ category: this.adminCategories[0].id })
    })
  }

  initProductForm(): void {
    this.productForm = this.fb.group(
      {
        category: [null, Validators.required],
        title: [null, Validators.required],
        path: [null, Validators.required],
        desc: [null, Validators.required],
        price: [null, Validators.required],
        weight: [null, Validators.required],
        imgPath: [null, Validators.required],
        count: [1]
      }
    )
  }

  addProduct(): void {
    if (this.editStatus) {
      this.productService.updateOneFirebase(this.productForm.value, this.currentID as string).then(() => {
        this.loadProduct()
        // this.toastr.success('Product Update')
      })

    } else {
      this.productService.createOneFirebase(this.productForm.value).then(() => {
        this.loadProduct()
        // this.toastr.success('Product Add')

      })
    }
    this.editStatus = false;
    this.productForm.reset()
    this.isUploaded = false
  }

  editProduct(product: IProductResponse): void {
    this.editStatus = true;
    this.isUploaded = true;
    this.currentID = product.id as number;
    this.productForm.patchValue(
      {
        category: product.category,
        title: product.title,
        path: product.path,
        desc: product.desc,
        price: product.price,
        weight: product.weight,
        imgPath: product.imgPath,
        count: product.count
      }
    )
  }

  deleteProduct(id: number | string): void {
    if (confirm('Rly delete?')) {
      this.productService.deleteOneFirebase(id as string).then(() => {
        this.loadProduct()
        // this.toastr.success('Product Delete')
      })
    }
  }

  upload(even: any): void {
    const file = even.target.files[0];
    this.imageService.uploadFile('images', file.name, file)
      .then(data => {
        this.productForm.patchValue(
          {
            imgPath: data
          }
        )
        this.isUploaded = true;
      })
      .catch(err => {
        console.log(err);

      })
  }

  deleteImage(): void {
    this.imageService.deleteUploadFile(this.valueByControl('imgPath'))
      .then(() => {
        this.isUploaded = false;
        this.uploadPercent = 0;
        this.productForm.patchValue({ imgPath: null })
      })
      .catch(err => {
        console.log(err);

      })
  }

  valueByControl(control: string): string {
    return this.productForm.get(control)?.value;
  }

}
