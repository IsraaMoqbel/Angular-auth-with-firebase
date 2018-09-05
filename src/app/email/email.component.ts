import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database-deprecated";
import { Router } from '@angular/router';
import { AuthService } from './../auth.service';


@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {
  error: any;
  email:string;
  password:string;
  constructor(public af: AngularFireAuth, private router: Router, public authService: AuthService) {
    console.log('Email activate', this.af.auth.currentUser)
    this.af.auth.onAuthStateChanged(auth => {
      if (!auth) {
        console.log('not authorized')
        // this.name = auth;

      } else {

        console.log('auth in members', auth)
        // this.router.navigate(['/members']);

      }
    });
  }

  onSubmit(formData) {
    if (formData.valid) {
      console.log(formData.value);
      this.authService.loginWithEmail(formData.value.email, formData.value.password).then((data) => {
        this.router.navigate(['/members']);
      })
        .catch(
          (err) => {
            console.log(err);
            this.error = err;
          })
    }
  }
  ngOnInit() {
  }
}
