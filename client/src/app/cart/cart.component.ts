import { Component, OnInit, AfterViewChecked } from "@angular/core";
import { ItemService } from "../item.service";
declare let paypal: any;

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"]
})
export class CartComponent implements OnInit, AfterViewChecked {
  constructor(private _item: ItemService) {}

  cart: Array<Object>;
  isEmpty: boolean = false;
  subtotal: number = 0;
  tax: number = 0;
  total: Number = 0.01;
  addScript: boolean = false;
  paypalLoad: boolean = true;
  paypalConfig = {
    env: "sandbox",
    client: {
      sandbox:
        "AWupQ_y-dNaAuaSWKpzUORYiQXCeQMr4M31evhrSWZNKzrRvCL6BC8_xVgTZthlnlrNr6PR6DxVXCVHk"
    },
    commit: true,
    payment: (data, actions) => {
      return actions.payment.create({
        payment: {
          transactions: [{ amount: { total: this.total, currency: "USD" } }]
        }
      });
    },
    onAuthorize: (data, actions) => {
      return actions.payment.execute().then(payment => {
        // re-route back to cart when done
      });
    }
  };

  ngOnInit() {
    this.getCart();
  }

  getCart() {
    this._item.initializeCart().subscribe(cart => {
      this.cart = cart["cart"];
      this.getTotals();
    });
  }

  getTotals() {
    if (this.cart.length <= 0) {
      this.tax = 0;
      this.total = 0;
      this.subtotal = 0;
      this.isEmpty = true;
    } else {
      this.isEmpty = false;
      this.subtotal = 0;
      for (let i = 0; i < this.cart.length; i++) {
        let { price } = this.cart[i]["item"];
        let qty = this.cart[i]["qty"];
        this.subtotal = this.subtotal + price * qty;
      }
      this.tax = this.subtotal * 0.06;
      this.total = this.subtotal + this.tax;
    }
  }

  updateQty(data) {
    for (let i = 0; i < this.cart.length; i++) {
      if (data["item"] === this.cart[i]["item"]) {
        this.cart[i]["qty"] = data["qty"];
      }
    }
    this.getTotals();
    this.updateCart();
  }

  removeItem(item) {
    for (let i = 0; i < this.cart.length; i++) {
      if (item === this.cart[i]["item"]) {
        this.cart.splice(i, 1);
      }
    }
    this.getTotals();
    this.updateCart();
  }

  updateCart() {
    this._item.updateCart(this.cart).subscribe(cart => {});
  }

  addPaypalScript() {
    this.addScript = true;
    return new Promise((resolve, reject) => {
      let scriptTagElement = document.createElement("script");
      scriptTagElement.src = "https://www.paypalobjects.com/api/checkout.js";
      scriptTagElement.onload = resolve;
      document.body.appendChild(scriptTagElement);
    });
  }

  ngAfterViewChecked(): void {
    if (!this.addScript) {
      this.addPaypalScript().then(() => {
        paypal.Button.render(this.paypalConfig, "#paypal-button");
        this.paypalLoad = false;
      });
    }
  }
}
