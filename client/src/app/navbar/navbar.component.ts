import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { SearchResultsComponent } from "../search-results/search-results.component";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {
  constructor(private _router: Router) {}

  query: String = "";

  categories: Array<Object> = [
    {
      title: "Books/Magazines",
      tag: "books"
    },
    {
      title: "Arts/Crafts",
      tag: "arts"
    },
    {
      title: "Tech/Gadets",
      tag: "tech"
    },
    {
      title: "Food/Produce",
      tag: "food"
    },
    {
      title: "Clothing/Apparel",
      tag: "clothing"
    },
    {
      title: "Toys/Collectibles",
      tag: "toys"
    },
    {
      title: "Home/Appliances",
      tag: "home"
    },
    {
      title: "Outdoors/Garden",
      tag: "outdoor"
    },
    {
      title: "Video Games",
      tag: "games"
    }
  ];

  onSearch() {
    this._router.navigate([`/results/${this.query}`]);
  }

  ngOnInit() {}
}
