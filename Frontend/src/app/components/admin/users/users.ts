import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserManager } from '../../../services/user-manager';
import { UserCard } from '../user-card/user-card';

@Component({
  selector: 'app-users',
  imports: [RouterModule,UserCard],
  templateUrl: './users.html',
  styleUrl: './users.css',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class Users implements OnInit {
  users!:any[];
  constructor(private u:UserManager,private c:ChangeDetectorRef){}
  ngOnInit(): void {
      this.u.getUsersForAdmin().subscribe(
        (res)=>
        {
          if(!res.denied)
          {
              this.users=res.users;
              this.c.markForCheck();
          }
        }
      )
  }
}
