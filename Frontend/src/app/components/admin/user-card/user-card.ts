import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { UserManager } from '../../../services/user-manager';

@Component({
  selector: 'app-user-card',
  imports: [],
  templateUrl: './user-card.html',
  styleUrl: './user-card.css',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class UserCard implements OnInit {
  @Input() username!:string
  @Input() email!:string;
  @Input() initialActivationStatus!:boolean;
  isActive!:boolean;
  constructor(private u:UserManager,private c:ChangeDetectorRef){}
  ngOnInit():void
  {
    this.isActive = this.initialActivationStatus;
  }
  deactivate()
  {
    this.u.changeUserStatus(false,this.email).subscribe(
      (res)=>
      {
        if(!res.denied)
        {
          this.isActive=false;
          this.c.markForCheck();
        }

      }
    )
  }
  activate()
  {
    this.u.changeUserStatus(true,this.email).subscribe(
      (res)=>
      {
        if(!res.denied)
        {
          this.isActive=true;
          this.c.markForCheck();
        }
      }
    )

  }
}
