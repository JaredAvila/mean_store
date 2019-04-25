import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LandingComponent } from "./landing/landing.component";
import { HomeComponent } from "./home/home.component";
import { CategoryPageComponent } from "./category-page/category-page.component";

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
