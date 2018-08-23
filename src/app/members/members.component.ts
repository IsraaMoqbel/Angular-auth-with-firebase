import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database-deprecated";
import { Router } from '@angular/router';


@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  name: any = 'Israa';
  state: string = '';

  constructor(public af: AngularFireAuth, private router: Router) {

    this.af.auth.onAuthStateChanged(auth => {
      if (auth) {
        console.log('auth', auth)
        this.name = auth;
      }
    });

  }

  logout() {
    this.af.auth.signOut();
    console.log('logged out');
    this.router.navigateByUrl('/login');
  }
  ngOnInit() {
  }

}
