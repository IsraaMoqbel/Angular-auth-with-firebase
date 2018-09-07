import { config } from './app.config';
import { Msg, User } from './app.model';
import { Injectable } from '@angular/core';
import {
  AngularFirestoreDocument,
  AngularFirestore,
  AngularFirestoreCollection
} from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  msgs: AngularFirestoreCollection<Msg>;
  users1: AngularFirestoreCollection<User>;
  users: any;
  allMsgs: any;
  private msgDoc: AngularFirestoreDocument<Msg>;
  private userDoc: AngularFirestoreDocument<User>;
  constructor(private db: AngularFirestore) {
    //Get the msgs and users collection
    this.msgs = db.collection<Msg>(config.collection_endpoint);
    this.users = db.collection<User>(config.users_endpoint);
  }

  addMsg(msg) {
  //Add the new msg to the collection
  this.msgs.add(msg);
  } //addTMsg

  addUser(user){
    this.users1=this.db.collection<User>(config.users_endpoint);
    this.users1.add(user);
  }


  updateMsg(id, update) {
     //Get the msg document
     this.msgDoc = this.db.doc<Msg>(`${config.collection_endpoint}/${id}`);
     this.msgDoc.update(update);
  } //updateMsg
  updateUser(id, update) {
     //Get the user document
     this.userDoc = this.db.doc<User>(`${config.users_endpoint}/${id}`);
     this.userDoc.update(update);
  } //updateUser

  deleteMsg(id) {
     //Get the msg document
     this.msgDoc = this.db.doc<Msg>(`${config.collection_endpoint}/${id}`);
     //Delete the document
     this.msgDoc.delete();
  } //deleteMsg

  getUsers(){
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
      return this.users
  }

  getMsgs(id1){
    this.allMsgs= this.db
      .collection(config.collection_endpoint, ref => ref.orderBy('date'))
      .snapshotChanges()
      .map(actions => {
        return actions.map(a => {
          //Get document data
          const data = a.payload.doc.data() as Msg;
          //Get document id
          const id = a.payload.doc.id;
          if (id1 === data.user_id) {
            data.show = false;
          } else {
            data.show = true;
          }
          //Use spread operator to add the id to the document data
          return { id, ...data };

        })

      })
      return this.allMsgs
  }

}
