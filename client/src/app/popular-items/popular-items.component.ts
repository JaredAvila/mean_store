import { Component, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-popular-items",
  templateUrl: "./popular-items.component.html",
  styleUrls: ["./popular-items.component.scss"]
})
export class PopularItemsComponent implements OnInit {
  @Output() addToCart = new EventEmitter();
  constructor() {}

  popItems: Array<Object> = [
    {
      _id: "5cc9bfd01e5bd741049bc454",
      name: "Wolverine",
      price: 40.5,
      img:
        "https://images-na.ssl-images-amazon.com/images/I/619oopfm1jL._SL1000_.jpg"
    },
    {
      _id: "5cc9c2231e5bd741049bc459",
      name: "LEGO Marvel Avengers: Avengers Ultimate Quinjet",
      price: 83.99,
      img:
        "https://images-na.ssl-images-amazon.com/images/I/81ekJnxc5xL._SL1500_.jpg"
    },
    {
      _id: "5cc9c5871e5bd741049bc462",
      name: "Instant Pot DUO60 6 Qt",
      price: 98.99,
      img:
        "https://images-na.ssl-images-amazon.com/images/I/71bN6MCuICL._SL1500_.jpg"
    }
  ];

  onAddToCart(data) {
    this.addToCart.emit(data);
  }

  ngOnInit() {}
}
