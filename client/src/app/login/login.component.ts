import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  constructor(private _auth: AuthService, private router: Router) {}
  user: Object = {
    email: "",
    password: ""
  };
  errors: Object = {
    email: false,
    emailMsg: "",
    password: false,
    passwordMsg: ""
  };

  ngOnInit() {}

  onLogin() {
    this.errors = {
      email: false,
      emailMsg: "",
      password: false,
      passwordMsg: ""
    };
    this._auth.loginUser(this.user).subscribe(data => {
      if (data["errors"]) {
        let errorMessage = Object.keys(data["errors"])[0];
        switch (errorMessage.length > 0) {
          case errorMessage === "email":
            this.errors["email"] = true;
            this.errors["emailMsg"] = data["errors"]["email"];
          case errorMessage === "password":
            this.errors["password"] = true;
            this.errors["passwordMsg"] = data["errors"]["password"];
        }
      } else {
        localStorage.setItem("token", data["token"]);
        this.router.navigate(["/home"]);
      }
    });
  }
}
