import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-admin-login",
  templateUrl: "./admin-login.component.html",
  styleUrls: ["./admin-login.component.scss"]
})
export class AdminLoginComponent implements OnInit {
  admin: Object = {
    email: "",
    password: ""
  };
  errors: Object = {
    email: false,
    emailMsg: "",
    admin: false,
    adminMsg: "",
    password: false,
    passwordMsg: ""
  };

  constructor(private _auth: AuthService, private router: Router) {}

  ngOnInit() {}

  onLogin(e) {
    e.preventDefault();
    this.errors = {
      email: false,
      emailMsg: "",
      password: false,
      passwordMsg: ""
    };
    this._auth.loginAdmin(this.admin).subscribe(data => {
      console.log(data);
      if (data["errors"]) {
        let errorMessage = Object.keys(data["errors"])[0];
        switch (errorMessage.length > 0) {
          case errorMessage === "email":
            this.errors["email"] = true;
            this.errors["emailMsg"] = data["errors"]["email"];
          case errorMessage === "password":
            this.errors["password"] = true;
            this.errors["passwordMsg"] = data["errors"]["password"];
          case errorMessage === "admin":
            this.errors["admin"] = true;
            this.errors["adminMsg"] = data["errors"]["admin"];
        }
      } else {
        localStorage.setItem("token", data["token"]);
        this.router.navigate(["/admin/dash"]);
      }
    });
  }
}
