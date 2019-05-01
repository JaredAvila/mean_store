import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ItemService } from "../item.service";

@Component({
  selector: "app-item-page",
  templateUrl: "./item-page.component.html",
  styleUrls: ["./item-page.component.scss"]
})
export class ItemPageComponent implements OnInit {
  constructor(private route: ActivatedRoute, private _item: ItemService) {}
  itemId: any;
  item: Object = {
    name: "",
    desc: "",
    price: "",
    img: ""
  };

  onAddToCart(data) {
    document.getElementById("atc-modal").style.opacity = "1";
    document.getElementById("atc-modal").style.visibility = "visible";
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
