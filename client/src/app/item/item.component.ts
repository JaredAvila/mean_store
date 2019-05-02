import { Component, OnInit, EventEmitter, Output, Input } from "@angular/core";
import { ItemService } from "../item.service";

@Component({
  selector: "app-item",
  templateUrl: "./item.component.html",
  styleUrls: ["./item.component.scss"]
})
export class ItemComponent implements OnInit {
  @Output() addToCart = new EventEmitter();
  @Input() newItem: any;

  constructor(private _item: ItemService) {}

  item: Object = {
    img: ""
  };

  onAddToCart() {
    this.addToCart.emit(this.item["_id"]);
    let cartItem = { item: this.item, qty: 1 };
    this._item.addItemGuest(cartItem).subscribe(cart => {
      console.log("added=> ", cart);
    });
  }

  getItem() {
    console.log("new item: ", this.newItem);
    this.item = this.newItem;
  }

  ngOnInit() {
    this.getItem();
  }
}
