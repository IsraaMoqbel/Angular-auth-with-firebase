import { config } from './app.config';
import { Msg } from './app.model';
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
  private taskDoc: AngularFirestoreDocument<Msg>;
  constructor(private db: AngularFirestore) {
    //Get the tasks collection
    this.msgs = db.collection<Msg>(config.collection_endpoint);
  }

  addMsg(msg) {
  //Add the new task to the collection
  this.msgs.add(msg);
} //addTask

updateMsg(id, update) {
   //Get the task document
   this.taskDoc = this.db.doc<Msg>(`${config.collection_endpoint}/${id}`);
   this.taskDoc.update(update);
} //updateTask

deleteMsg(id) {
   //Get the task document
   this.taskDoc = this.db.doc<Msg>(`${config.collection_endpoint}/${id}`);
   //Delete the document
   this.taskDoc.delete();
} //deleteTask

// saveTask() {
//    if (this.myTask !== null) {
//       //Get the input value
//       let task = {
//          description: this.myTask
//       };
//       if (!this.editMode) {
//          console.log(task);
//          this.taskService.addTask(task);
//       } else {
//          //Get the task id
//          let taskId = this.taskToEdit.id;
//          //update the task
//          this.taskService.updateTask(taskId, task);
//       }
//       //set edit mode to false and clear form
//       this.editMode = false;
//       this.myTask = “”;
//    }
// } //saveTask

}
