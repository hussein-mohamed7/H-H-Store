import { NgClass, NgOptimizedImage } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card',
  imports: [NgOptimizedImage,RouterLink,NgClass],
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class Card {
  @Input() cardImg!:string;
  @Input() cardText!:string;
  @Input() routeLink!:string;
  @Input() cardPrice!:number;
  @Input() addMarginLeft:boolean=false;
}
