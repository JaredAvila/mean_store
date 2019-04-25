import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  constructor() {}

  onAddToCart(data) {
    console.log("please work ", data);
    document.getElementById("atc-modal").style.visibility = "visible";
  }

  onCloseModal() {
    document.getElementById("atc-modal").style.visibility = "hidden";
  }

  ngOnInit() {}
}
