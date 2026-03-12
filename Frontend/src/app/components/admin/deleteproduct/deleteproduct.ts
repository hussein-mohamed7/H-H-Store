import { Component, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DeleteCardSlider } from '../../delete-vertical-card-slider/delete-vertical-card-slider';
import { Deletecard } from '../../deletecard/deletecard';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-delete-product',
  imports: [RouterModule, DeleteCardSlider, Deletecard,FormsModule],
  templateUrl: './deleteproduct.html',
  styleUrl: './deleteproduct.css',
})
export class Deleteproduct {
  @ViewChild('slider') slider!:DeleteCardSlider;
  query:string="";
  search()
  {
    this.slider.resetPages();
  }
}
