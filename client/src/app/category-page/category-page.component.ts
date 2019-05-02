import { Component, OnInit, ViewChild } from "@angular/core";
import { ItemService } from "../item.service";
import { ActivatedRoute } from "@angular/router";
import { AddToCartComponent } from "../add-to-cart/add-to-cart.component";

@Component({
  selector: "app-category-page",
  templateUrl: "./category-page.component.html",
  styleUrls: ["./category-page.component.scss"]
})
export class CategoryPageComponent implements OnInit {
  constructor(private _item: ItemService, private route: ActivatedRoute) {}

  @ViewChild(AddToCartComponent) addToCart;

  items: Array<Object>;
  category: String = "";
  categories: Object = {
    books: "Books/Magazines",
    arts: "Arts/Crafts",
    tech: "Tech/Gadgets",
    food: "Food/Produce",
    clothing: "Clothing/Apparel",
    toys: "Toys/Collectibles",
    home: "Home/Appliances",
    outdoor: "Outdoor/Gardening",
    games: "Video Games"
  };
  currentItem: Object;

  onAddToCart(data) {
    this._item.getById(data).subscribe(item => {
      this.currentItem = item["item"];
      this.addToCart.getItemHome(this.currentItem);
    });
    document.getElementById("atc-modal").style.opacity = "1";
    document.getElementById("atc-modal").style.visibility = "visible";
    this.currentItem = data;
  }

  onCloseModal() {
    document.getElementById("atc-modal").style.opacity = "0";
    document.getElementById("atc-modal").style.visibility = "hidden";
  }

  getItems() {
    this.route.params.subscribe(cat => {
      let currentCat = cat["category"];
      this.category = this.categories[currentCat];
      this._item.getByCategory(cat).subscribe(data => {
        this.items = data["items"];
      });
    });
  }

  getCategory() {}

  ngOnInit() {
    this.getItems();
  }
}
