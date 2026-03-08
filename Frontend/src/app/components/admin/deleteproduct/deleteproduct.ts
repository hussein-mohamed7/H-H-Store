import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DeleteCardSlider } from '../../delete-vertical-card-slider/delete-vertical-card-slider';
import { Deletecard } from "../../deletecard/deletecard";

@Component({
  selector: 'app-delete-product',
  imports: [RouterModule, DeleteCardSlider, Deletecard],
  templateUrl: './deleteproduct.html',
  styleUrl: './deleteproduct.css',
})
export class Deleteproduct {

}
