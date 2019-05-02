import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-cart-item",
  templateUrl: "./cart-item.component.html",
  styleUrls: ["./cart-item.component.scss"]
})
export class CartItemComponent implements OnInit {
  constructor() {}
  qty: Number;

  @Input() cartItem;
  @Output() qtyUpdate = new EventEmitter();
  @Output() remove = new EventEmitter();

  ngOnInit() {
    this.qty = this.cartItem["qty"];
  }

  updateQty() {
    let update;
    if (this.qty <= 0) {
      update = { qty: 0, item: this.cartItem["item"] };
      this.qty = 0;
    } else {
      update = { qty: this.qty, item: this.cartItem["item"] };
    }
    this.qtyUpdate.emit(update);
  }

  removeItem(item) {
    this.remove.emit(item);
  }
}
