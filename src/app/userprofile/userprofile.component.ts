import { Component, OnInit, OnChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from './../app.service';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { AuthService } from './../auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';

import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit, OnChanges {
  username:string;
  photoURL:string;
  dateReg:any;
  displayName:string;
  updateUsername:string;
  id:any;
  registeredUser:string;

  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadState: Observable<string>;
  uploadProgress: Observable<number>;

  constructor(public af: AngularFireAuth,private router: Router,private route:ActivatedRoute,  public appService: AppService, public authService: AuthService, private afStorage: AngularFireStorage) {
    this.af.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        // this.id = authUser.uid;
        this.router.navigate(['user',this.route.snapshot.paramMap.get('username')]);
        this.registeredUser = authUser.displayName
      } else {
      this.router.navigate(['/login']);

      }
    });
this.username =this.route.snapshot.paramMap.get('username');
  }

  ngOnInit() {


    this.route.paramMap
    .subscribe(data => {
      this.router.navigate(['user',data.get('username')]);
      this.getUsername()
      this.getUser(this.username);

    });


  }
  ngOnChanges(){console.log('change!!!')
    this.getUsername()
    this.getUser(this.username);
  }
  getUsername(): void {
    const username = this.route.snapshot.paramMap.get('username');
    this.username = username;

  }
  getUser(username){
    this.appService.getUsers().subscribe(users=>{
      users.forEach(user=>{
        if(user.username == username){
          this.photoURL = user.photoURL;
          this.dateReg=user.date;
        }
        if(user.username == this.registeredUser){
          this.id = user.id;
        }
      })
    })

  }

  updateUser(){
    let user = {
      username: this.updateUsername
      // ,     photoURL:'xxx'
    };
    let userId = this.id;
    //update the user
    this.appService.updateUser(userId, user);
    this.af.auth.onAuthStateChanged(auth => {
      if (auth) {
        auth.updateProfile({
          displayName: this.updateUsername
          , // some displayName,
          photoURL: auth.photoURL// some photo url
        })
        this.router.navigate([`/chat`]);
      }
    });
  }

  upload(event) {
    const id = Math.random().toString(36).substring(2);
    this.ref = this.afStorage.ref(id);
    this.task = this.ref.put(event.target.files[0]);
    this.uploadProgress = this.task.percentageChanges();

    this.task.snapshotChanges().pipe(
      finalize(() => {
        this.ref.getDownloadURL().subscribe(url => {

          let user = {
          photoURL:url
          };

            this.appService.updateUser(this.id,user);

          //set edit mode to false and clear form

        });
      })

    )
      .subscribe()
  }

  logout() {
    const x = this;
    this.authService.logout().then(function() {
      console.log('logged out');
      x.router.navigateByUrl('/login');
    }).catch(function(error) {
      // An error happened.
    });
  }
}
