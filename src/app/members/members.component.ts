import { Component, OnInit, OnChanges, DoCheck } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database-deprecated";
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './../auth.service';
import { AppService } from '../app.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { config } from '../app.config';
import { Msg, User } from '../app.model';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/take';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';

import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  user: any;
  msgs: Observable<any[]>;
  users: Observable<any[]>;
  id: any;
  myMsg: string;
  editMode: boolean = false;
  msgToEdit: any = {};
  username:string;
  downloadURL: Observable<string>;
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadState: Observable<string>;
  uploadProgress: Observable<number>;

  constructor(public af: AngularFireAuth, public authService: AuthService, private router: Router, private db: AngularFirestore, private appService: AppService, private afStorage: AngularFireStorage, private route:ActivatedRoute) {

    this.af.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.router.navigate(['/chat']);

        this.id = authUser.uid;
        this.user = authUser;
        this.username=authUser.displayName;
      } else {
        this.router.navigate(['/login']);

      }
    });
  }


  ngOnInit() {
    // this.msgs = this.db.collection(config.collection_endpoint).valueChanges();
    this.route.paramMap
    .subscribe(data => {
      this.router.navigate(['/chat']);
        this.af.auth.onAuthStateChanged(auth => {
          if(auth){
            this.msgs = this.appService.getMsgs(this.id);
          }
        });

        this.users = this.appService.getUsers();


    });
  }

  edit(msg) {
    //Set msgToEdit and editMode
    this.msgToEdit = msg;
    this.editMode = true;
    //Set form value
    this.myMsg = msg.msg;
  } //edit

  saveMsg() {
    if (this.myMsg !== null) {
      //Get the input value
      let msg = {
        msg: this.myMsg,
        user_id: this.id,
        date: Date.now(),
        username: this.user.displayName,
        msgText: true
      };
      if (!this.editMode) {
        this.appService.addMsg(msg);
          window.scrollTo(0,document.body.scrollHeight);
      } else {
        //Get the msg id
        let msg = {
          msg: this.myMsg,
          msgText: true
        };
        let msgId = this.msgToEdit.id;
        //update the msg
        this.appService.updateMsg(msgId, msg);
      }
      //set edit mode to false and clear form
      this.editMode = false;
      this.myMsg = '';
    }
  } //saveMsg

  deleteMsg(msg) {
    this.appService.deleteMsg(msg)
  }

  upload(event) {
    const id = Math.random().toString(36).substring(2);
    this.ref = this.afStorage.ref(id);
    this.task = this.ref.put(event.target.files[0]);
    this.uploadProgress = this.task.percentageChanges();

    this.task.snapshotChanges().pipe(
      finalize(() => {
        this.ref.getDownloadURL().subscribe(url => {

          let msg = {
            msg: url,
            user_id: this.id,
            date: Date.now(),
            username: this.user.displayName,
            msgText: false
          };
            this.appService.addMsg(msg);

          //set edit mode to false and clear form
          this.editMode = false;
        });
      })

    )
      .subscribe()
  }



}
