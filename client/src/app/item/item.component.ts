import { Component, OnInit, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "app-item",
  templateUrl: "./item.component.html",
  styleUrls: ["./item.component.scss"]
})
export class ItemComponent implements OnInit {
  @Output() addToCart = new EventEmitter();

  constructor() {}

  onAddToCart() {
    this.addToCart.emit();
  }

  ngOnInit() {}
}
