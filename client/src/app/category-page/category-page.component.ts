import { Component, OnInit, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "app-category-page",
  templateUrl: "./category-page.component.html",
  styleUrls: ["./category-page.component.scss"]
})
export class CategoryPageComponent implements OnInit {
  constructor() {}

  onAddToCart(data) {
    console.log(data);
    document.getElementById("atc-modal").style.visibility = "visible";
  }
  onCloseModal() {
    document.getElementById("atc-modal").style.visibility = "hidden";
  }

  ngOnInit() {}
}
