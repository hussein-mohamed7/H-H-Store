import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserManager } from '../../../services/user-manager';

@Component({
  selector: 'app-users',
  imports: [RouterModule],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users implements OnInit {
  users!:any[];
  constructor(private u:UserManager){}
  ngOnInit(): void {
      this.u.getUsersForAdmin().subscribe(
        (res)=>
        {
          if(!res.denied)
          {

          }
        }
      )
  }
}
