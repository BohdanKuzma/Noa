import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { DeliveryComponent } from './pages/delivery/delivery/delivery.component';
import { ProductComponent } from './pages/product/product/product.component';
import { ThaiMarketComponent } from './pages/thai-market/thai-market/thai-market.component';
import { FavoritesComponent } from './pages/favorites/favorites/favorites.component';
import { HomeComponent } from './pages/home/home/home.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { AboutComponent } from './pages/about/about.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'delivery', component: DeliveryComponent },
  { path: 'product', component: ProductComponent },
  { path: 'thai-market', component: ThaiMarketComponent },
  { path: 'favorite', component: FavoritesComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule {

}
