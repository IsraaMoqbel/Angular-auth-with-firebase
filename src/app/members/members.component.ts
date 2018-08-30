import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database-deprecated";
import { Router } from '@angular/router';
import { AuthService } from './../auth.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  name: any = 'Israa';
  state: string = '';
  private isLoggedIn: Boolean;
 private user_displayName: String;
 private user_email: String;
 constructor(public af: AngularFireAuth, private router: Router, public authService: AuthService ) {

   // this.authService.af.auth.subscribe(
   //   (auth) => {
   //     if (auth == null) {
   //       console.log("Logged out");
   //       this.isLoggedIn = false;
   //       this.user_displayName = '';
   //       this.user_email = '';
   //       this.router.navigate(['login']);
   //     } else {
   //       this.isLoggedIn = true;
   //       this.user_displayName = auth.google.displayName;
   //       this.user_email = auth.google.email;
   //       console.log("Logged in");
   //       console.log(auth);
   //       this.router.navigate(['']);
   //     }
   //   }
   // );
   this.af.auth.onAuthStateChanged(auth => {
   if (auth) {
     console.log('auth in members', auth)
     this.name = auth;
           this.router.navigate(['/members']);
   } else {
           this.router.navigate(['/login']);

   }
 });
 }



    logout() {
      const x = this
      this.authService.logout().then(function() {
        console.log('logged out');
        x.router.navigateByUrl('/login');
      }).catch(function(error) {
        // An error happened.
      });
    }
    ngOnInit() {
    }
  }
