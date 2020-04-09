import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm } from '@angular/forms';

import { Subscription } from 'rxjs';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

import { UserTextService } from 'src/app/services/user-text.service';
import { User } from 'src/app/models/user.model';

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
  loggedInUser: User;
  paramsSub: Subscription;
  userSub: Subscription;
  faPaperPlane = faPaperPlane;

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
      this.loggedInUser = x;
    });

  }

  onSubmit(form: NgForm) {
    const text = form.value.message;
    console.log(text);
    // console.log(this.loggedInUser.bio);
    console.log(this.user.name);
    form.reset();
  }

  ngOnDestroy() {
    this.paramsSub.unsubscribe();
    this.userSub.unsubscribe();
  }

}
