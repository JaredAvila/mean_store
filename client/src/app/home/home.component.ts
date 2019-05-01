import { Component, OnInit, ViewChild } from "@angular/core";
import { ItemService } from "../item.service";
import { AddToCartComponent } from "../add-to-cart/add-to-cart.component";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  @ViewChild(AddToCartComponent) child;
  constructor(private _item: ItemService) {}
  currentItem: any;

  onAddToCart(data) {
    this._item.getById(data).subscribe(item => {
      this.currentItem = item["item"];
      this.child.getItemHome(this.currentItem);
    });
    document.getElementById("atc-modal").style.opacity = "1";
    document.getElementById("atc-modal").style.visibility = "visible";
    this.currentItem = data;
  }

  onCloseModal() {
    document.getElementById("atc-modal").style.opacity = "0";
    document.getElementById("atc-modal").style.visibility = "hidden";
  }

  ngOnInit() {}
}
