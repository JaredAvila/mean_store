import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ItemService } from "../item.service";
import { AddToCartComponent } from "../add-to-cart/add-to-cart.component";

@Component({
  selector: "app-search-results",
  templateUrl: "./search-results.component.html",
  styleUrls: ["./search-results.component.scss"]
})
export class SearchResultsComponent implements OnInit {
  constructor(private _item: ItemService, private route: ActivatedRoute) {}

  @ViewChild(AddToCartComponent) addToCart;
  items: Array<Object> = [];
  query: String = "";
  currentItem: any;
  item: Object = {
    name: "",
    desc: "",
    price: "",
    img: ""
  };

  onAddToCart(data) {
    document.getElementById("atc-modal").style.opacity = "1";
    document.getElementById("atc-modal").style.visibility = "visible";
    this._item.getById(data).subscribe(item => {
      this.currentItem = item["item"];
      this.addToCart.getItemHome(this.currentItem);
    });
  }

  onCloseModal() {
    document.getElementById("atc-modal").style.opacity = "0";
    document.getElementById("atc-modal").style.visibility = "hidden";
  }

  search() {
    this.route.params.subscribe(data => {
      this.query = data["query"];
      this._item.searchItems(this.query).subscribe(data => {
        console.log("search results: ", data);
        this.items = data["items"];
      });
    });
  }

  ngOnInit() {
    this.search();
  }
}
