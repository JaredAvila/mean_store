import { Component, OnInit } from "@angular/core";
import * as M from "../../assets/materialize/js/materialize.min";

@Component({
  selector: "app-landing",
  templateUrl: "./landing.component.html",
  styleUrls: ["./landing.component.scss"]
})
export class LandingComponent implements OnInit {
  constructor() {}

  options;
  ngOnInit(): void {
    document.addEventListener("DOMContentLoaded", function() {
      var elems = document.querySelectorAll(".slider");
      var instances = M.Slider.init(elems, this.options);
    });
  }
}
