import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-item-page",
  templateUrl: "./item-page.component.html",
  styleUrls: ["./item-page.component.scss"]
})
export class ItemPageComponent implements OnInit {
  constructor() {}

  onAddToCart() {
    document.getElementById("atc-modal").style.visibility = "visible";
  }

  onCloseModal() {
    document.getElementById("atc-modal").style.visibility = "hidden";
  }

  ngOnInit() {}
}
