import { Component, OnInit, Input } from '@angular/core';

import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  @Input() user: User;
  @Input() index: number;

  constructor() {}

  ngOnInit() {}
}
