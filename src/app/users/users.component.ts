import { Component, OnInit } from '@angular/core';

import { AppService } from '../app.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router, ActivatedRoute } from '@angular/router';

import 'rxjs/add/operator/map';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: any;
  constructor(private appService: AppService,public af: AngularFireAuth,private router: Router, private route:ActivatedRoute) {
    this.af.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.router.navigate(['/users']);
      } else {
        this.router.navigate(['/login']);

      }
    });
   }

  ngOnInit() {
  this.route.paramMap
  .subscribe(data => {
  this.router.navigate(['users']);
  this.users = this.appService.getUsers();
  });
}

}
