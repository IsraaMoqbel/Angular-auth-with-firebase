import { Component, OnInit, OnChanges } from '@angular/core';
import { UsersService } from '../users.service';
import { Subject } from 'rxjs/Subject'

@Component({
  selector: 'app-users-search',
  templateUrl: './users-search.component.html',
  styleUrls: ['./users-search.component.css']
})
export class UsersSearchComponent implements OnInit, OnChanges {

  filteredUsers;
  // startAt = new Subject()
  // endAt = new Subject()
  username = '';
  constructor(private usersSvc: UsersService) { }

  ngOnInit() {
  }

  search($event) {
    this.username = $event.target.value;
    // this.startAt.next(q)
    // this.endAt.next(q+"\uf8ff")
    this.usersSvc.getFilteredUsers(this.username).valueChanges()
      .subscribe(users => { this.filteredUsers = users; console.log(users) })
  }
  ngOnChanges() {

  }
}
