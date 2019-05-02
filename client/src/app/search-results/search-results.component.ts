import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ItemService } from "../item.service";

@Component({
  selector: "app-search-results",
  templateUrl: "./search-results.component.html",
  styleUrls: ["./search-results.component.scss"]
})
export class SearchResultsComponent implements OnInit {
  constructor(private _item: ItemService, private route: ActivatedRoute) {}
  items: Array<Object> = [];
  query: String = "";

  onAddToCart(data) {
    document.getElementById("atc-modal").style.opacity = "1";
    document.getElementById("atc-modal").style.visibility = "visible";
  }

  onCloseModal() {
    document.getElementById("atc-modal").style.opacity = "0";
    document.getElementById("atc-modal").style.visibility = "hidden";
  }

  search() {
    this.route.params.subscribe(data => {
      this.query = data["query"];
      this._item.searchItems(this.query).subscribe(data => {
        console.log("search results: ", data);
        this.items = data["items"];
      });
    });
  }

  ngOnInit() {
    this.search();
  }
}
