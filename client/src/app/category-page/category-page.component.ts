import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { ItemService } from "../item.service";

@Component({
  selector: "app-category-page",
  templateUrl: "./category-page.component.html",
  styleUrls: ["./category-page.component.scss"]
})
export class CategoryPageComponent implements OnInit {
  constructor(private _item: ItemService) {}

  items: Array<Object>;

  onAddToCart(data) {
    document.getElementById("atc-modal").style.opacity = "1";
    document.getElementById("atc-modal").style.visibility = "visible";
  }

  onCloseModal() {
    document.getElementById("atc-modal").style.opacity = "0";
    document.getElementById("atc-modal").style.visibility = "hidden";
  }

  getItems() {
    this._item.getAll().subscribe(data => {
      console.log("items: ", data);
      this.items = data["items"];
    });
  }

  ngOnInit() {
    this.getItems();
  }
}
