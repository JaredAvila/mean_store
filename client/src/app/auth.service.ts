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
  //Register user
  registerUser(user) {
    return this._http.post("/api/users/register", user);
  }

  //login admin
  loginAdmin(admin) {
    return this._http.post("/api/admin/login", admin);
  }

  //get logged in user or not
  getCurrent(headers) {
    return this._http.get("/api/users/current", { headers });
  }
}
