import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

import { DeliveryComponent } from './pages/delivery/delivery.component';
import { ProductComponent } from './pages/product/product.component';
import { ThaiMarketComponent } from './pages/thai-market/thai-market.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { HomeComponent } from './pages/home/home.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { AboutComponent } from './pages/about/about.component';

import { AdminComponent } from './admin/admin.component';
import { AdminProductComponent } from './admin/admin-product/admin-product.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';

import { initializeApp } from "firebase/app";
import { environment } from 'src/app/environments/environment';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirebaseApp } from '@angular/fire/app';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductInfoComponent } from './pages/product-info/product-info.component';
import { ThaiMarketInfoComponent } from './pages/thai-market-info/thai-market-info.component';



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
    AboutComponent,
    AdminComponent,
    AdminProductComponent,
    AdminCategoryComponent,
    ProductInfoComponent,
    ThaiMarketInfoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideStorage(() => getStorage()),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
