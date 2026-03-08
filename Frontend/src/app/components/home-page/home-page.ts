import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardSlider } from "../card-slider/card-slider";

@Component({
  selector: 'app-home-page',
  imports: [CommonModule,CardSlider ],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {

}
