import { Component, OnInit, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "app-sale",
  templateUrl: "./sale.component.html",
  styleUrls: ["./sale.component.scss"]
})
export class SaleComponent implements OnInit {
  @Output() addToCart = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  onAddToCart() {
    this.addToCart.emit();
  }
}
