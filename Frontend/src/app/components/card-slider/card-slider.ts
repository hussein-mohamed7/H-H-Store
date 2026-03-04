import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Card } from '../card/card';

@Component({
  selector: 'app-card-slider',
  imports: [Card],
  templateUrl: './card-slider.html',
  styleUrl: './card-slider.css',
})
export class CardSlider implements OnInit, AfterViewInit {
  @ViewChild("scrollContainer") scrollContainer!:ElementRef
  scrollElement!:any;
  touchX:number=0;
  ngOnInit(): void {

  }
  ngAfterViewInit(): void {
      // console.log(this.scrollContainer);
      this.scrollElement = this.scrollContainer.nativeElement;
  }

  dragStart(event:any):void
  {
    console.log(event.clientX);
    console.log("aaaaaaaaa");
    this.touchX = event.clientX;
    this.scrollElement.classList.remove("scroll");
  }
  dragStop():void
  {
    this.touchX=0;
    this.scrollElement.classList.add("scroll");
  }
  dragMove(event:any):void
  {
    if(this.touchX!=0)
    {
      let movement = this.touchX-event.clientX;
      this.touchX=event.clientX;
      console.log("lmao");
      this.scrollElement.scrollBy({left:movement});
    }

  }
  scrollRight():void
  {
    this.scrollElement.scrollBy({left:1000});
  }
  scrollLeft():void
  {
    this.scrollElement.scrollBy({left:-200});
  }
}
