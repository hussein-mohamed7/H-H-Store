import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-delete-card',
  imports: [],
  templateUrl: './deletecard.html',
  styleUrl: './deletecard.css',
})
export class Deletecard {
  @Input() cardImg!:string;
  @Input() cardText!:string;
}
