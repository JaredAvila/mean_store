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
      img: "../../assets/img/categories/books.jpg"
    },
    {
      title: "Arts/Crafts",
      img: "../../assets/img/categories/arts.jpg"
    },
    {
      title: "Tech/Gadets",
      img: "../../assets/img/categories/tech.jpg"
    },
    {
      title: "Food/Produce",
      img: "../../assets/img/categories/food.jpg"
    },
    {
      title: "Clothing/Apparel",
      img: "../../assets/img/categories/apparel.jpg"
    },
    {
      title: "Toys/Collectibles",
      img: "../../assets/img/categories/toys.jpg"
    },
    {
      title: "Home/Appliances",
      img: "../../assets/img/categories/home.jpg"
    },
    {
      title: "Outdoors/Garden",
      img: "../../assets/img/categories/outdoor.jpg"
    },
    {
      title: "Video Games",
      img: "../../assets/img/categories/games.png"
    }
  ];

  constructor() {}

  ngOnInit() {}
}
