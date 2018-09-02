import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from './../app.service';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { AuthService } from './../auth.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {
username:string;
photoURL:string;

  constructor(private router: Router,private route:ActivatedRoute,  public appService: AppService, public authService: AuthService) {

   }

  ngOnInit() {
    this.getUsername()
    this.getUser(this.username);
  }
  getUsername(): void {
    const username = this.route.snapshot.paramMap.get('username');
    this.username = username;

  }
  getUser(username){
    this.appService.getUser(username).subscribe(users=>{
      users.forEach(user=>{
        if(user.username == username){
          console.log(user)
          this.photoURL = user.photoURL;
        }
      })
    })

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
