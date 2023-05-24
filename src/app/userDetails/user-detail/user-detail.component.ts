import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm } from '@angular/forms';

import { Subscription } from 'rxjs';
import { faPaperPlane, faEnvelope } from '@fortawesome/free-solid-svg-icons';

import { UserTextService } from '../../services/user-text.service';
import { User } from '../../models/user.model';
import { Message } from '../../models/message.model';
import { maleUser } from '../../../assets/assets-files/maleUser';
import { femaleUser } from '../../../assets/assets-files/femaleUser';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnInit, OnDestroy {
  maleUser: string = maleUser;
  femaleUser: string = femaleUser;
  userSelected: boolean = false;
  id: number;
  user: User;
  loggedInUser: string = '';

  paramsSub: Subscription;
  userSub: Subscription;
  userSelectedSub: Subscription;

  faPaperPlane = faPaperPlane;
  faEnvelope = faEnvelope;
  yourMsg: Message[] = [];
  othersMsg: Message[] = [];
  showMsg: boolean = false;

  constructor(private userServ: UserTextService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.userSelectedSub = this.userServ.isUserSelected$.subscribe(
      userSelection => (this.userSelected = userSelection),
    );

    this.paramsSub = this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      if (this.userSelected) {
        this.user = this.userServ.getUser(this.id);
      } else {
        this.router.navigate(['/']);
      }
    });

    this.userSub = this.userServ.loggedInUser$.subscribe(x => {
      this.loggedInUser = x.name.toString();
      this.showMsg = false;
    });
  }

  onSubmit(form: NgForm) {
    const text = form.value.message;
    this.userServ.saveMessage(this.user.name, text);
    form.reset();
    this.showMsg = false;
  }

  getMyMsg() {
    this.showMsg = !this.showMsg;
    this.yourMsg = this.userServ.getMessages(this.loggedInUser, this.user.name);
    console.log(this.yourMsg);

    this.othersMsg = this.userServ.getMessages(this.user.name, this.loggedInUser);
    console.log(this.othersMsg);
  }

  ngOnDestroy() {
    if (this.paramsSub) {
      this.paramsSub.unsubscribe();
    }

    if (this.userSub) {
      this.userSub.unsubscribe();
    }

    if(this.userSelectedSub) {
      this.userSelectedSub.unsubscribe();
    }
  }
}
