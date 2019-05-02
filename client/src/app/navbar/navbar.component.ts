import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";
import { HttpHeaders } from "@angular/common/http";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {
  constructor(private _router: Router, private _auth: AuthService) {}

  query: String = "";
  user: Object;

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

  getCurrentUser() {
    let token = localStorage.getItem("token");
    if (!token) {
      this.user = null;
    } else {
      let headers = new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: localStorage.token
      });
      this._auth.getCurrent(headers).subscribe(user => {
        if (user) {
          this.user = user["user"]["_id"];
        }
      });
    }
  }

  onLogout() {
    localStorage.removeItem("token");
    this._router.navigate(["/login"]);
  }

  ngOnInit() {
    this.getCurrentUser();
  }
}
