import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';

import { User } from '../models/user.model';
import { UserTextService } from '../services/user-text.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit, OnDestroy {
  public isCollapsed = false;
  myUsers: User[];
  textableUsers: User[];
  selectedUser: User;
  logedIn: boolean = false;
  faUser = faUser;
  userSub: Subscription;

  constructor(private userServ: UserTextService, private router: Router) {}

  ngOnInit() {
    this.myUsers = this.userServ.getUsers();

    this.userSub = this.userServ.userChanged$.subscribe(users => {
      this.textableUsers = users;
      // this.selectedUser = this.myUsers[0];
      // this.userServ.changeusers(this.selectedUser);
    });
  }

  selected() {
    this.logedIn = true;
    this.userServ.changeusers(this.selectedUser);
    this.router.navigate(['/users']);
    // console.log(this.textableUsers);
    // alert(this.selectedUser.name)
  }

  ngOnDestroy() {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }
}
