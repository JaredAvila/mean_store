import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LandingComponent } from "./landing/landing.component";
import { HomeComponent } from "./home/home.component";
import { CategoryPageComponent } from "./category-page/category-page.component";
import { ItemPageComponent } from "./item-page/item-page.component";
import { SearchResultsComponent } from "./search-results/search-results.component";
import { CartComponent } from "./cart/cart.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";

const routes: Routes = [
  {
    path: "",
    component: LandingComponent
  },
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "category",
    component: CategoryPageComponent
  },
  {
    path: "item",
    component: ItemPageComponent
  },
  {
    path: "results",
    component: SearchResultsComponent
  },
  {
    path: "cart",
    component: CartComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "register",
    component: RegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
