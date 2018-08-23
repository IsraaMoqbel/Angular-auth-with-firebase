import { Component, OnInit, HostBinding } from '@angular/core';
// import {  AuthProviders, AuthMethods } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database-deprecated";

import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  error: any;
     constructor(public af: AngularFireAuth,private router: Router) {

       this.af.auth.onAuthStateChanged(auth => {
       if(auth) {
         this.router.navigateByUrl('/members');
       }
     });
   }

   loginFb() {
     // this.af.auth.login({
     //   provider: AuthProviders.Facebook,
     //   method: AuthMethods.Popup,
     // }).then(
     //     (success) => {
     //     this.router.navigate(['/members']);
     //   }).catch(
     //     (err) => {
     //     this.error = err;
     //   })
   }

   loginGoogle() {
     // this.af.auth.login({
     //   provider: AuthProviders.Google,
     //   method: AuthMethods.Popup,
     // }).then(
     //     (success) => {
     //     this.router.navigate(['/members']);
     //   }).catch(
     //     (err) => {
     //     this.error = err;
     //   })
   }


  ngOnInit() {
  }

}
