import { Component, OnInit } from "@angular/core";
import { ItemService } from "../item.service";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"]
})
export class CartComponent implements OnInit {
  constructor(private _item: ItemService) {}

  cart: Array<Object>;
  subtotal: number = 0;
  tax: number = 0;
  total: number = 0;

  ngOnInit() {
    this.getCart();
  }

  getCart() {
    this._item.initializeCart().subscribe(cart => {
      this.cart = cart["cart"];
      this.getTotals();
      console.log(this.cart);
    });
  }

  getTotals() {
    this.total = 0;
    this.tax = 0;
    this.subtotal = 0;
    for (let i = 0; i < this.cart.length; i++) {
      let { price } = this.cart[i]["item"];
      let qty = this.cart[i]["qty"];
      this.subtotal = this.subtotal + price * qty;
    }
    this.tax = this.subtotal * 0.06;
    this.total = this.subtotal + this.tax;
  }

  updateQty(data) {
    for (let i = 0; i < this.cart.length; i++) {
      if (data["item"] === this.cart[i]["item"]) {
        this.cart[i]["qty"] = data["qty"];
      }
    }
    this.getTotals();
  }

  removeItem(item) {
    for (let i = 0; i < this.cart.length; i++) {
      if (item === this.cart[i]["item"]) {
        console.log("say yeah!");
        this.cart.splice(i, 1);
      }
    }
    this.getTotals();
  }
}
