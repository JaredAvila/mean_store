import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ItemService } from "../item.service";
import { AddToCartComponent } from "../add-to-cart/add-to-cart.component";

@Component({
  selector: "app-item-page",
  templateUrl: "./item-page.component.html",
  styleUrls: ["./item-page.component.scss"]
})
export class ItemPageComponent implements OnInit {
  constructor(private route: ActivatedRoute, private _item: ItemService) {}

  @ViewChild(AddToCartComponent) child;

  itemId: any;
  item: Object = {
    name: "",
    desc: "",
    price: "",
    img: ""
  };
  cartItem: Object;
  qty: Number = 1;

  onAddToCart(data) {
    document.getElementById("atc-modal").style.opacity = "1";
    document.getElementById("atc-modal").style.visibility = "visible";
    this.cartItem = {
      name: this.item["name"],
      img: this.item["img"],
      qty: this.qty
    };
    this.child.getItemItem(this.cartItem);
    let newCartItem = { item: this.item, qty: this.qty };
    this._item.addItemGuest(newCartItem).subscribe(cart => {});
  }

  onCloseModal() {
    document.getElementById("atc-modal").style.opacity = "0";
    document.getElementById("atc-modal").style.visibility = "hidden";
  }

  getId() {
    this.route.params.subscribe(data => {
      this._item.getById(data["id"]).subscribe(data => {
        this.item = data["item"];
      });
    });
  }

  ngOnInit() {
    this.getId();
  }
}
