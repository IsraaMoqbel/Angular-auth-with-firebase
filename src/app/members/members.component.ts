import { Component, OnInit, OnChanges, DoCheck } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database-deprecated";
import { Router } from '@angular/router';
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

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  name: any = 'Israa';
  msgs: Observable<any[]>;
  users: Observable<any[]>;
  id: any;
  myMsg: string;
  editMode: boolean = false;
  msgToEdit: any = {};

  downloadURL: Observable<string>;
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadState: Observable<string>;
  uploadProgress: Observable<number>;

  constructor(public af: AngularFireAuth, public authService: AuthService, private router: Router, private db: AngularFirestore, private appService: AppService, private afStorage: AngularFireStorage) {

    this.af.auth.onAuthStateChanged(auth => {
      if (auth) {
        this.id = auth.uid;
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
    // this.msgs = this.db.collection(config.collection_endpoint).valueChanges();

    this.msgs = this.db
      .collection(config.collection_endpoint, ref => ref.orderBy('date'))
      .snapshotChanges()
      .map(actions => {
        return actions.map(a => {
          //Get document data
          const data = a.payload.doc.data() as Msg;
          //Get document id
          const id = a.payload.doc.id;

          if (this.name.displayName === data.username) {
            data.show = false;
          } else {
            data.show = true;
          }
          //Use spread operator to add the id to the document data
          return { id, ...data };
        })
      });

    this.users = this.db
      .collection(config.users_endpoint)
      .snapshotChanges()
      .map(actions => {
        return actions.map(a => {
          //Get document data
          const data = a.payload.doc.data() as User;
          //Get document id
          const id = a.payload.doc.id;
          //Use spread operator to add the id to the document data
          return { id, ...data };
        })
      });
  }

  edit(msg) {
    console.log(msg);
    //Set taskToEdit and editMode
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
        username: this.name.displayName,
        msgText: true
      };
      if (!this.editMode) {
        console.log('sent msg', msg);
        this.appService.addMsg(msg);
      } else {
        //Get the msg id
        let msgId = this.msgToEdit.id;
        //update the msg
        this.appService.updateMsg(msgId, msg);
      }
      //set edit mode to false and clear form
      this.editMode = false;
      this.myMsg = '';
    }
  } //saveTask

  addMsg(msg) {
    console.log('ssss', JSON.parse(msg), typeof (JSON.parse(msg)))
    this.appService.addMsg({ msg: 'hellooo as manual msg' })
  }

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

          //Get the input value
          let msg = {
            msg: url,
            user_id: this.id,
            date: Date.now(),
            username: this.name.displayName,
            msgText: false
          };
          if (!this.editMode) {
            console.log('sent msg', msg);
            this.appService.addMsg(msg);
          } else {
            //Get the msg id
            let msgId = this.msgToEdit.id;
            //update the msg
            this.appService.updateMsg(msgId, msg);
          }
          //set edit mode to false and clear form
          this.editMode = false;

          console.log(url); // <-- do what ever you want with the url..
        });
      })
    )
      .subscribe()
  }

}
