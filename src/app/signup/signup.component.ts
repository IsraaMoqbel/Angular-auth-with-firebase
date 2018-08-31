import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database-deprecated";
import {AppService} from '../app.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  state: string = '';
  error: any;

  constructor(public af: AngularFireAuth, private router: Router,private appService: AppService) {}

  onSubmit(formData) {
    if (formData.valid) {
      console.log(formData.value);
      this.af.auth.createUserWithEmailAndPassword(
        formData.value.email,
        formData.value.password
      )
      .then(
        (success) => {
          console.log('success', success);
            this.appService.addUser({username: formData.value.displayName})

          this.router.navigate(['/login'])
        }).catch(
          (err) => {
            console.log(err);
            this.error = err;
          })
    }
    //adding name and photoUrl to firebase
    this.af.auth.onAuthStateChanged(auth => {
      if (auth) {
        auth.updateProfile({
          displayName: formData.value.displayName, // some displayName,
          photoURL: 'xxxxxx'// some photo url
        })
      }
    });
  }

  ngOnInit() {
  }

}
