import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HttpHeaders } from "@angular/common/http";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-user-dash",
  templateUrl: "./user-dash.component.html",
  styleUrls: ["./user-dash.component.scss"]
})
export class UserDashComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private _router: Router,
    private _auth: AuthService
  ) {}

  password: String = "";
  errors: any;
  success: any;

  user: Object = {
    firstName: "",
    lastName: "",
    email: "",
    shipping: {
      street: "",
      state: "",
      city: "",
      zip: ""
    }
  };

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    let token = localStorage.getItem("token");
    if (!token) {
      this._router.navigate(["/login"]);
    } else {
      let headers = new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: localStorage.token
      });
      this._auth.getProfile(headers).subscribe(user => {
        this.user = user["user"];
      });
    }
  }

  updateUser() {
    let token = localStorage.getItem("token");
    if (!token) {
      this._router.navigate(["/login"]);
    } else {
      let headers = new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: localStorage.token
      });
      let info = {
        user: this.user,
        password: this.password
      };
      this._auth.updateInfo(info, headers).subscribe(data => {
        if (data["errors"]) {
          this.errors = data["errors"];
        } else {
          this.password = "";
          this.success = "Successfully Updated Info";
        }
        setTimeout(() => {
          this.errors = "";
          this.success = "";
        }, 4000);
      });
    }
  }
}
