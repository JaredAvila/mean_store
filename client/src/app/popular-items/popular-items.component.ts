import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { ItemService } from "../item.service";

@Component({
  selector: "app-popular-items",
  templateUrl: "./popular-items.component.html",
  styleUrls: ["./popular-items.component.scss"]
})
export class PopularItemsComponent implements OnInit {
  @Output() addToCart = new EventEmitter();
  constructor(private _item: ItemService) {}

  itemIds: Array<String> = [
    "5cc9bfd01e5bd741049bc454",
    "5cc9c2231e5bd741049bc459",
    "5cc9c5871e5bd741049bc462"
  ];
  popItems: Array<Object> = [];

  onAddToCart(data) {
    this.addToCart.emit(data);
  }

  getPopItems() {
    for (let i = 0; i < this.itemIds.length; i++) {
      this._item.getById(this.itemIds[i]).subscribe(item => {
        this.popItems.push(item["item"]);
      });
    }
  }

  ngOnInit() {
    this.getPopItems();
  }
}
