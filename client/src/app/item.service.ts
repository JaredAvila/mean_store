import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class ItemService {
  constructor(private _http: HttpClient) {}

  initializeCart() {
    return this._http.get("/api/items/cart");
  }

  getAll() {
    return this._http.get("/api/items");
  }

  getById(itemId) {
    return this._http.post("/api/items/item", { itemId });
  }

  getByCategory(cat) {
    return this._http.post("/api/items/category", cat);
  }

  addItemGuest(cartItem) {
    return this._http.post("api/items/guest/addToCart", cartItem);
  }

  updateCart(update) {
    return this._http.post("/api/items/updateCart", update);
  }
}
