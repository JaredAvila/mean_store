import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class ItemService {
  constructor(private _http: HttpClient) {}

  getAll() {
    return this._http.get("/api/items");
  }

  getById(itemId) {
    return this._http.post("/api/items/item", { itemId });
  }
}
