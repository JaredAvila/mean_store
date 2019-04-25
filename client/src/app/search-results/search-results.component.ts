import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-search-results",
  templateUrl: "./search-results.component.html",
  styleUrls: ["./search-results.component.scss"]
})
export class SearchResultsComponent implements OnInit {
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
