import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";

//Components
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { LandingComponent } from "./landing/landing.component";
import { NavbarComponent } from './navbar/navbar.component';
import { SaleComponent } from './sale/sale.component';
import { ItemComponent } from './item/item.component';
import { PopularItemsComponent } from './popular-items/popular-items.component';
import { FeaturedCategoriesComponent } from './featured-categories/featured-categories.component';
import { CategoryComponent } from './category/category.component';
import { CategoryPageComponent } from './category-page/category-page.component';
import { ItemPageComponent } from './item-page/item-page.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { AddToCartComponent } from './add-to-cart/add-to-cart.component';
import { CartComponent } from './cart/cart.component';
import { CartItemComponent } from './cart-item/cart-item.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, LandingComponent, NavbarComponent, SaleComponent, ItemComponent, PopularItemsComponent, FeaturedCategoriesComponent, CategoryComponent, CategoryPageComponent, ItemPageComponent, SearchResultsComponent, AddToCartComponent, CartComponent, CartItemComponent, FooterComponent, LoginComponent, RegisterComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
