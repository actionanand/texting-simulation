import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm } from '@angular/forms';

import { Subscription } from 'rxjs';
import { faPaperPlane, faEnvelope } from '@fortawesome/free-solid-svg-icons';

import { UserTextService } from 'src/app/services/user-text.service';
import { User } from 'src/app/models/user.model';
import { Message } from 'src/app/models/message.model';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit, OnDestroy {

  imgUrl: string = 'https://clipartstation.com/wp-content/uploads/2018/09/contact-information-clipart-6.jpg';
  userSelected: boolean = false;
  id: number;
  user: User;
  loggedInUser: string = '';
  paramsSub: Subscription;
  userSub: Subscription;
  faPaperPlane = faPaperPlane;
  faEnvelope = faEnvelope;
  yourMsg: Message[] = [];
  othersMsg: Message[] = [];
  showMsg: boolean = false;


  constructor(private userServ: UserTextService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.userSelected = this.userServ.isUserSelected();
    this.paramsSub = this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      if(this.userSelected) {
        this.user = this.userServ.getUser(this.id);
      } else {
        this.router.navigate(['/']);
      }
    });

    this.userSub = this.userServ.loggedInUser.subscribe(x => {
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
    this.paramsSub.unsubscribe();
    this.userSub.unsubscribe();
  }

}
