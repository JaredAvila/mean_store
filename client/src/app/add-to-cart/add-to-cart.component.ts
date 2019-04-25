import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.scss']
})
export class AddToCartComponent implements OnInit {

  @Output() closeModal = new EventEmitter();

  constructor() { }

  onCloseModal(){
    this.closeModal.emit();
  }

  ngOnInit() {
  }

}
