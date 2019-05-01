import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class AdminService {
  constructor(private _http: HttpClient) {}

  newItem(item, headers) {
    return this._http.post("/api/admin/addNew", item, { headers });
  }
}
