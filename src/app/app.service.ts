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
  users: AngularFirestoreCollection<User>;
  private taskDoc: AngularFirestoreDocument<Msg>;
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
  this.users.add(user);
}

updateMsg(id, update) {
   //Get the msg document
   this.taskDoc = this.db.doc<Msg>(`${config.collection_endpoint}/${id}`);
   this.taskDoc.update(update);
} //updateMsg

deleteMsg(id) {
   //Get the msg document
   this.taskDoc = this.db.doc<Msg>(`${config.collection_endpoint}/${id}`);
   //Delete the document
   this.taskDoc.delete();
} //deleteMsg


}
