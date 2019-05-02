import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {
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

  constructor() {}

  ngOnInit() {}
}
