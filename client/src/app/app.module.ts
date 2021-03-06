import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";

//Services
import { AuthService } from "./auth.service";
import { AdminService } from "./admin.service";
import { ItemService } from "./item.service";

//Components
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { LandingComponent } from "./landing/landing.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { SaleComponent } from "./sale/sale.component";
import { ItemComponent } from "./item/item.component";
import { PopularItemsComponent } from "./popular-items/popular-items.component";
import { FeaturedCategoriesComponent } from "./featured-categories/featured-categories.component";
import { CategoryComponent } from "./category/category.component";
import { CategoryPageComponent } from "./category-page/category-page.component";
import { ItemPageComponent } from "./item-page/item-page.component";
import { SearchResultsComponent } from "./search-results/search-results.component";
import { AddToCartComponent } from "./add-to-cart/add-to-cart.component";
import { CartComponent } from "./cart/cart.component";
import { CartItemComponent } from "./cart-item/cart-item.component";
import { FooterComponent } from "./footer/footer.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { UserDashComponent } from "./user-dash/user-dash.component";
import { OrderComponent } from "./order/order.component";
import { AdminDashComponent } from "./admin-dash/admin-dash.component";
import { AdminLoginComponent } from "./admin-login/admin-login.component";
import { AdminComponent } from "./admin/admin.component";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LandingComponent,
    NavbarComponent,
    SaleComponent,
    ItemComponent,
    PopularItemsComponent,
    FeaturedCategoriesComponent,
    CategoryComponent,
    CategoryPageComponent,
    ItemPageComponent,
    SearchResultsComponent,
    AddToCartComponent,
    CartComponent,
    CartItemComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    UserDashComponent,
    OrderComponent,
    AdminDashComponent,
    AdminLoginComponent,
    AdminComponent
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [AuthService, AdminService, ItemService],
  bootstrap: [AppComponent]
})
export class AppModule {}
