import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { VerticalCardSlider } from '../../vertical-card-slider/vertical-card-slider';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-updatesearch',
  imports: [RouterModule,VerticalCardSlider,FormsModule],
  templateUrl: './updatesearch.html',
  styleUrl: './updatesearch.css',
})
export class Updatesearch implements OnInit {
  @ViewChild("slider") slider!:VerticalCardSlider;
  query!:string;
  ngOnInit(): void {

  }
  search()
  {
    this.slider.resetPages();
  }
}
