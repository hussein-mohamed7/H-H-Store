import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-page',
  imports: [],
  templateUrl: './search-page.html',
  styleUrl: './search-page.css',
})
export class SearchPage implements OnInit{
  gender!:string|null;
  query!:string|null;
  constructor(private active:ActivatedRoute){}
  ngOnInit(): void {
    this.gender = this.active.snapshot.paramMap.get("Gender");
    this.query = this.active.snapshot.paramMap.get("Query");
  }
}
