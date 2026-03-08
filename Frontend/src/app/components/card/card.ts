import { NgOptimizedImage } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  imports: [NgOptimizedImage],
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class Card {
  @Input() cardImg!:string;
  @Input() cardText!:string;
}
