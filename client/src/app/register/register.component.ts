import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
  constructor(private _auth: AuthService, private router: Router) {}

  user: Object = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    password2: ""
  };
  errors: Object = {
    email: false,
    emailMsg: "",
    password: false,
    passwordMsg: "",
    firstName: false,
    firstNameMsg: "",
    password2: false,
    password2_msg: "",
    lastName: false,
    lastNameMsg: ""
  };

  ngOnInit() {}

  onRegister(e) {
    e.preventDefault();
    this.errors = {
      email: false,
      emailMsg: "",
      password: false,
      passwordMsg: "",
      firstName: false,
      firstNameMsg: "",
      password2: false,
      password2Msg: "",
      lastName: false,
      lastNameMsg: ""
    };
    this._auth.registerUser(this.user).subscribe(data => {
      if (data["errors"]) {
        let errorMsg = Object.keys(data["errors"])[0];
        switch (errorMsg.length > 0) {
          case errorMsg === "firstName":
            this.errors["firstName"] = true;
            this.errors["firstNameMsg"] = data["errors"]["firstName"];
          case errorMsg === "lastName":
            this.errors["lastName"] = true;
            this.errors["lastNameMsg"] = data["errors"]["lastName"];
          case errorMsg === "email":
            this.errors["email"] = true;
            this.errors["emailMsg"] = data["errors"]["email"];
          case errorMsg === "password":
            this.errors["password"] = true;
            this.errors["passwordMsg"] = data["errors"]["password"];
          case errorMsg === "password2":
            this.errors["password2"] = true;
            this.errors["password2Msg"] = data["errors"]["password2"];
        }
      } else {
        localStorage.setItem("token", data["token"]);
        this.router.navigate(["/home"]);
      }
    });
  }
}
