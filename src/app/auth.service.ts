import { CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from "angularfire2/auth";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

import { AppService } from './app.service';


@Injectable()
export class AuthService {
  LoggedIn:boolean=false;
  error:string='';
  constructor(private af: AngularFireAuth, private router: Router, private appService: AppService) {
    this.af.auth.onAuthStateChanged(auth => {
      if (!auth) {
        console.log('not authorized')
      } else {
        this.LoggedIn=true;
        this.router.navigate(['/chat']);

      }
    });
  }

  signUpWithAuth(email,displayName,username,photoURL,password){
    this.af.auth.createUserWithEmailAndPassword(
      email,
      password
    )
    .then(
      (success) => {
          this.appService.addUser({uid:success.user.uid,email:email,displayName: displayName,username: username,photoURL: photoURL || null,date:Date.now()})
          this.LoggedIn=true;

      }).catch(
        (err) => {
          this.error=err;
        })
  }

  loginWithEmail(email, password) {
    return this.af.auth.signInWithEmailAndPassword(email, password);
  }

  loginWithAuth(email, password) {
 this.af.auth.signInWithEmailAndPassword(email, password).then((data) => {
      // this.router.navigate(['/chat']);
      this.LoggedIn=true;
    })
      .catch(
        (err) => {
          console.log(err);
          this.error=err;
        })
  }

  logout() {
    this.LoggedIn=false;
    return this.af.auth.signOut()
  }



}
