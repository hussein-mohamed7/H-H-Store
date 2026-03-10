import { NgStyle } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-email-verification-popup',
  imports: [NgStyle],
  templateUrl: './email-verification-popup.html',
  styleUrl: './email-verification-popup.css',
})
export class EmailVerificationPopup implements OnInit {
  @Input() color!:string;
  @Input() topMessage!:string;
  @Input() message!:string;
  @Output() close = new EventEmitter();
  bgColor!:string;
  hoverColor!:string;
  hovering=false;
  ngOnInit():void
  {
    switch(this.color)
    {
      case "r":
        this.bgColor="eb9d91";
        this.hoverColor="a85848";
        break;
      case "y":
        this.bgColor="ebe791";
        this.hoverColor="a89e48";
        break;
      case "g":
        this.bgColor="bdeb91";
        this.hoverColor="77a848";
        break;
    }
  }
}
