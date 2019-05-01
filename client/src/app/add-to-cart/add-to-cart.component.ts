import { Component, OnInit, EventEmitter, Output, Input } from "@angular/core";

@Component({
  selector: "app-add-to-cart",
  templateUrl: "./add-to-cart.component.html",
  styleUrls: ["./add-to-cart.component.scss"]
})
export class AddToCartComponent implements OnInit {
  @Output() closeModal = new EventEmitter();

  item: Object = {
    name: "",
    img: ""
  };

  qty: any;

  constructor() {}

  onCloseModal() {
    this.closeModal.emit();
  }

  getItemHome(data) {
    this.item = data;
    this.qty = 1;
  }

  getItemItem(data) {
    this.item = data;
    this.qty = data["qty"];
  }

  ngOnInit() {}
}
