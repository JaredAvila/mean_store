import { Component, OnInit } from "@angular/core";
import { AdminService } from "../admin.service";
import { ItemService } from "../item.service";

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

  ngOnInit() {
    this.getAllItems();
  }

  onAddItem(item) {
    this._admin.newItem(item).subscribe(data => {
      console.log(data);
    });
  }

  getAllItems() {
    this._item.getAll().subscribe(data => {
      console.log(data);
    });
  }
}
