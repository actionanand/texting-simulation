import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

import { User } from '../models/user.model';
import { Message } from '../models/message.model';

@Injectable({
  providedIn: 'root'
})
export class UserTextService {

  userChanged = new Subject<User[]>();
  loggedInUser = new Subject<User>();
  private userSelected: boolean = false;
  loggedInUserInfo: User;

  private users: User[] = [
    {name: 'Anand', email: 'anand@ar.com', occupation: 'Software Engineer', gender: 'Male', contact: 9876543210, bio: 'I am a passionate web developer'},
    {name: 'Anisha', email: 'anisha@ar.com', occupation: 'Doctor', gender: 'Female', contact: 9877543210, bio: 'I am a heart specialist'},
    {name: 'Stephy', email: 'stephy@ar.com', occupation: 'Banker', gender: 'Female', contact: 9876643210, bio: 'I love my job'},
    {name: 'Ramesh', email: 'ramesh@ar.com', occupation: 'Student', gender: 'Male', contact: 9976543210, bio: 'I am a cool guy'},
    {name: 'Aishwarya', email: 'aishwarya@ar.com', occupation: 'Software Engineer', gender: 'Female', contact: 8876543210, bio: 'I am an android Developer'}
];

private messages: Message [] = [];
private textableUsers: User[];
tempBox: Message[];


  constructor() { }

  getUsers() {
    return [...this.users];
  }

  changeusers(user: User) {
    this.userSelected = true;
    this.loggedInUserInfo = user;
    this.textableUsers = [];
    this.textableUsers = this.users.filter(x => {
      return x.name.toString() !== user.name.toString();
    });
    this.userChanged.next([...this.textableUsers]);
    this.loggedInUser.next({...user});
  }

  isUserSelected() {
    return this.userSelected;
  }

  getUser(index: number) {
    this.loggedInUser.next({...this.loggedInUserInfo});
    return this.textableUsers[index];
  }

  getMessages(userA: string ,userB: string) {
    this.tempBox = [];
    this.tempBox = this.messages.filter(x => {
      return (x.fromUser == userA && x.toUser == userB)
    });
    return this.tempBox;
  }

  saveMessage(userB: string, text: string) {
    const fromUser: string = this.loggedInUserInfo.name;
    // console.log({fromUser, userB, text});
    this.messages.push({fromUser, toUser: userB, content: text});
    this.loggedInUser.next({...this.loggedInUserInfo});
  }
  
}
