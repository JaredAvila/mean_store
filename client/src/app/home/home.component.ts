import { Component, OnInit, ViewChild } from "@angular/core";
import { ItemService } from "../item.service";
import { AddToCartComponent } from "../add-to-cart/add-to-cart.component";
declare const AOS: any;

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  @ViewChild(AddToCartComponent) addToCart;
  constructor(private _item: ItemService) {}
  currentItem: any;
  qty: 1;

  //checks to see if there is a cart in session, inits if none
  setCart() {
    this._item.initializeCart().subscribe(data => {});
  }

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

  ngOnInit() {
    this.setCart();
    AOS.init();
  }
}
