import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { DeliveryComponent } from './pages/delivery/delivery.component';
import { ProductComponent } from './pages/product/product.component';
import { ProductInfoComponent } from './pages/product-info/product-info.component';
import { ThaiMarketComponent } from './pages/thai-market/thai-market.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { HomeComponent } from './pages/home/home.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { AboutComponent } from './pages/about/about.component';
import { AdminComponent } from './admin/admin.component';
import { AdminProductComponent } from './admin/admin-product/admin-product.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { ProductResolver } from './shared/services/product/product.resolver';



const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'delivery', component: DeliveryComponent },
  {
    path: 'product/:category', component: ProductComponent,
  },
  {
    path: 'product/:category/:id', component: ProductInfoComponent, resolve: {
      productInfo: ProductResolver
    }
  },
  { path: 'thai-market', component: ThaiMarketComponent },
  { path: 'favorite', component: FavoritesComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: "admin", component: AdminComponent, children: [
      { path: "category", component: AdminCategoryComponent },
      { path: "product", component: AdminProductComponent },
      { path: "orders", component: AdminOrdersComponent },
      { path: "", pathMatch: "full", redirectTo: "category" },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule {

}
