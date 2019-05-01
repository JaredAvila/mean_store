import { Component, OnInit } from "@angular/core";
import { AdminService } from "../admin.service";
import { ItemService } from "../item.service";
import { HttpHeaders } from "@angular/common/http";

@Component({
  selector: "app-admin-dash",
  templateUrl: "./admin-dash.component.html",
  styleUrls: ["./admin-dash.component.scss"]
})
export class AdminDashComponent implements OnInit {
  constructor(private _admin: AdminService, private _item: ItemService) {}

  item: Object = {
    name: "",
    desc: "",
    price: "",
    img: "",
    category: ""
  };

  errors: Object = {
    errorMsg: "",
    error: false
    // category: false,
    // categoryMsg: "",
    // desc: false,
    // descMsg: "",
    // img: false,
    // imgMsg: "",
    // price: false,
    // priceMsg: "",
    // name: false,
    // nameMsg: "",
    // auth: false,
    // authMsg: ""
  };

  ngOnInit() {
    this.getAllItems();
  }

  onAddItem(e) {
    e.preventDefault();
    if (!localStorage.token) {
      this.errors["auth"] = true;
      this.errors["authMsg"] = "Not Logged In";
    } else {
      let headers = new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: localStorage.token
      });
      this._admin.newItem(this.item, headers).subscribe(data => {
        console.log(data);
        if (data["errors"]) {
          this.errors["error"] = true;
          this.errors["errorMsg"] = Object.values(data["errors"])[0];
          // let errorMessage = Object.keys(data["errors"])[0];
          // switch (errorMessage.length > 0) {
          //   case errorMessage === "auth":
          //     this.errors["auth"] = true;
          //     this.errors["authMsg"] = data["errors"]["auth"];
          //   case errorMessage === "name":
          //     this.errors["name"] = true;
          //     this.errors["nameMsg"] = data["errors"]["name"];
          //   case errorMessage === "desc":
          //     this.errors["desc"] = true;
          //     this.errors["descMsg"] = data["errors"]["desc"];
          //   case errorMessage === "price":
          //     this.errors["price"] = true;
          //     this.errors["priceMsg"] = data["errors"]["price"];
          //   case errorMessage === "img":
          //     this.errors["img"] = true;
          //     this.errors["imgMsg"] = data["errors"]["img"];
          //   case errorMessage === "category":
          //     this.errors["category"] = true;
          //     this.errors["categoryMsg"] = data["errors"]["category"];
          // }
        } else {
          console.log("Success, new item: ", data);
        }
      });
    }
  }

  getAllItems() {
    this._item.getAll().subscribe(data => {
      console.log(data);
    });
  }
}
