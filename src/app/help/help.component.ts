import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';

import { UserTextService } from '../services/user-text.service';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css'],
})
export class HelpComponent implements OnInit, OnDestroy {
  dataSub: Subscription;
  userStateSub: Subscription;
  pageInfo = 'help';
  userSelected: boolean;

  constructor(private activatedRoute: ActivatedRoute, private userTxtServ: UserTextService) {}

  ngOnInit() {
    this.dataSub = this.activatedRoute.data.subscribe(data => {
      if (!!data.page) {
        this.pageInfo = data.page;
      }
    });

    this.userStateSub = this.userTxtServ.isUserSelected$.subscribe(selection => (this.userSelected = selection));
  }

  ngOnDestroy(): void {
    if (this.dataSub) {
      this.dataSub.unsubscribe();
    }

    if (this.userStateSub) {
      this.userStateSub.unsubscribe();
    }
  }
}
