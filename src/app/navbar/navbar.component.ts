import { Component, OnInit,Input } from '@angular/core';
import { AuthService } from './../auth.service';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
@Input('login') login;
username:string;
  constructor(private appService: AppService, public authService: AuthService,private router: Router,public af: AngularFireAuth) {
    this.af.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.username=authUser.displayName;
      }
    });
   }

  ngOnInit() {
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

}
