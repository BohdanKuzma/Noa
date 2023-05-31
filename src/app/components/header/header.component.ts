import { Component } from '@angular/core';
import { ICategoryResponse } from 'src/app/shared/interfaces/category.interface';
import { CategoryService } from 'src/app/shared/services/category/category.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  public userCategory: Array<ICategoryResponse> = [];

  public currentProduct!: ICategoryResponse;
  public menuStatus = false;

  constructor(
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.getData()
  }

  getData(): void {
    this.categoryService.getAllFirebase().subscribe(data => {
      this.userCategory = data as ICategoryResponse[]
    })
  }

  openMenu(): void {
    this.menuStatus = !this.menuStatus;
    document.body.classList.toggle('_lock')
    
  }


}
