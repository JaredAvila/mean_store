import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private _http: HttpClient) {}

  //login user
  loginUser(user) {
    return this._http.post("/api/users/login", user);
  }
}
