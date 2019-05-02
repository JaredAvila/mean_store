import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-featured-categories",
  templateUrl: "./featured-categories.component.html",
  styleUrls: ["./featured-categories.component.scss"]
})
export class FeaturedCategoriesComponent implements OnInit {
  categories: Array<Object> = [
    {
      title: "Books/Magazines",
      img: "../../assets/img/categories/books.jpg",
      tag: "books"
    },
    {
      title: "Arts/Crafts",
      img: "../../assets/img/categories/arts.jpg",
      tag: "arts"
    },
    {
      title: "Tech/Gadets",
      img: "../../assets/img/categories/tech.jpg",
      tag: "tech"
    },
    {
      title: "Food/Produce",
      img: "../../assets/img/categories/food.jpg",
      tag: "food"
    },
    {
      title: "Clothing/Apparel",
      img: "../../assets/img/categories/apparel.jpg",
      tag: "clothing"
    },
    {
      title: "Toys/Collectibles",
      img: "../../assets/img/categories/toys.jpg",
      tag: "toys"
    },
    {
      title: "Home/Appliances",
      img: "../../assets/img/categories/home.jpg",
      tag: "home"
    },
    {
      title: "Outdoors/Garden",
      img: "../../assets/img/categories/outdoor.jpg",
      tag: "outdoors"
    },
    {
      title: "Video Games",
      img: "../../assets/img/categories/games.png",
      tag: "games"
    }
  ];

  constructor() {}

  ngOnInit() {}
}
