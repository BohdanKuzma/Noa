import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ToastrService } from 'ngx-toastr';
import { ICategoryResponse } from 'src/app/shared/interfaces/category.interface';
import { CategoryService } from 'src/app/shared/services/category/category.service';
// import { CategoriesServiceService } from 'src/app/shared/services/categories/categories-service.service';
// import { percentage, ref, Storage, uploadBytesResumable, getDownloadURL, deleteObject } from '@angular/fire/storage'
import { ImageService } from 'src/app/shared/services/image/image.service';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss']
})
export class AdminCategoryComponent implements OnInit {

  public currentID!: number | string;

  public editStatus = false;

  public categoryForm!: FormGroup;

  public adminCategories: Array<ICategoryResponse> = [];

  public uploadPercent!: number;

  public isUploaded = false;

  constructor(
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private imageService: ImageService,
    // private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.loadCategory()
    this.initCategoryForm()
  }

  initCategoryForm(): void {
    this.categoryForm = this.fb.group(
      {
        title: [null, Validators.required],
        path: [null, Validators.required],
        imgPath: [null, Validators.required],
      }
    )
  }

  loadCategory(): void {
    this.categoryService.getAllFirebase().subscribe(data => {
      this.adminCategories = data as ICategoryResponse[];
    })
  }

  addCategory(): void {
    if (this.editStatus) {
      this.categoryService.updateOneFirebase(this.categoryForm.value, this.currentID as string).then(() => {
        this.loadCategory()
        // this.toastr.success('Category successfully updated')
      })
    } else {
      this.categoryService.createOneFirebase(this.categoryForm.value).then(() => {
        this.loadCategory()
        // this.toastr.success('Category successfully created')

      })
    }
    this.categoryForm.reset()
    this.editStatus = false;
    this.isUploaded = false;
  }

  deleteCategory(id: number | string): void {

    if (confirm("Rly delete?")) {
      this.categoryService.deleteOneFirebase(id as string).then(() => {
        this.loadCategory()
        // this.toastr.success('Category successfully deleted')
      })
    }
  }

  editCategory(category: ICategoryResponse): void {
    this.editStatus = true;
    this.isUploaded = true;
    this.categoryForm.patchValue(
      {
        title: category.title,
        path: category.path,
        imgPath: category.imgPath
      }
    )
    this.currentID = category.id as number;
  }

  upload(even: any): void {
    const file = even.target.files[0];
    this.imageService.uploadFile('images', file.name, file)
      .then(data => {
        this.categoryForm.patchValue(
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
        this.categoryForm.patchValue({ imgPath: null })
      })
      .catch(err => {
        console.log(err);
      })
  }
  valueByControl(control: string): string {
    return this.categoryForm.get(control)?.value;
  }
}
