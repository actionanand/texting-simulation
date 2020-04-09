import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { UserTextService } from 'src/app/services/user-text.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-user-ui',
  templateUrl: './user-ui.component.html',
  styleUrls: ['./user-ui.component.css']
})
export class UserUiComponent implements OnInit, OnDestroy {

  textableUsers: User[];
  userSub: Subscription;

  constructor(private userServ:UserTextService) { }
  
  ngOnInit() {
    
    this.textableUsers = this.userServ.getUsers();

    this.userSub = this.userServ.userChanged.subscribe(users => {
      this.textableUsers = users;
    });

  }

  ngOnDestroy(){
    this.userSub.unsubscribe();
  }

}
