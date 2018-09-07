import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import {
  AngularFirestoreDocument,
  AngularFirestore,
  AngularFirestoreCollection
} from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private db: AngularFirestore) { }

  getFilteredUsers(username): any {
  return this.db.collection('users', (ref => ref.orderBy('date').where('username','==',username)));
}

}
