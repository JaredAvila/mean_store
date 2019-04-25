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

@NgModule({
  declarations: [AppComponent, HomeComponent, LandingComponent, NavbarComponent, SaleComponent, ItemComponent, PopularItemsComponent, FeaturedCategoriesComponent, CategoryComponent, CategoryPageComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
