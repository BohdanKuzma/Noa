import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

import { DeliveryComponent } from './pages/delivery/delivery/delivery.component';
import { ProductComponent } from './pages/product/product/product.component';
import { ThaiMarketComponent } from './pages/thai-market/thai-market/thai-market.component';
import { FavoritesComponent } from './pages/favorites/favorites/favorites.component';
import { HomeComponent } from './pages/home/home/home.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { AboutComponent } from './pages/about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DeliveryComponent,
    ProductComponent,
    ThaiMarketComponent,
    FavoritesComponent,
    HomeComponent,
    ContactsComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
