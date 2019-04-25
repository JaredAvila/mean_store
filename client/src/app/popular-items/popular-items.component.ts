import { Component, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-popular-items",
  templateUrl: "./popular-items.component.html",
  styleUrls: ["./popular-items.component.scss"]
})
export class PopularItemsComponent implements OnInit {
  @Output() addToCart = new EventEmitter();
  constructor() {}

  onAddToCart(data) {
    this.addToCart.emit(data);
  }

  ngOnInit() {}
}
