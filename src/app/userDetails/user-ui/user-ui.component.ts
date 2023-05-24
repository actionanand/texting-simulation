import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { UserTextService } from '../../services/user-text.service';
import { User } from '../../models/user.model';
import { homeImg } from '../../../assets/assets-files/homeProfile';

@Component({
  selector: 'app-user-ui',
  templateUrl: './user-ui.component.html',
  styleUrls: ['./user-ui.component.css'],
})
export class UserUiComponent implements OnInit, OnDestroy {
  homeImg: string = homeImg;
  textableUsers: User[];
  userSub: Subscription;

  constructor(private userServ: UserTextService) {}

  ngOnInit() {
    this.textableUsers = this.userServ.getUsers();

    this.userSub = this.userServ.userChanged$.subscribe(users => {
      this.textableUsers = users;
    });
  }

  ngOnDestroy() {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }
}
