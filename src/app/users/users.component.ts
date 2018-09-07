import { Component, OnInit } from '@angular/core';

import { AppService } from '../app.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

import 'rxjs/add/operator/map';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: any;
  constructor(private appService: AppService,public af: AngularFireAuth,private router: Router) {
    this.af.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.router.navigate(['/users']);
      } else {
        this.router.navigate(['/login']);

      }
    });
   }

  ngOnInit() {
    this.users = this.appService.getUsers();
  }

}
