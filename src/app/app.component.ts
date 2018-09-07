import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from './auth.service';
import { AppService } from './app.service';
import { Router } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { config } from './app.config';
import 'rxjs/add/operator/map';
import { Msg } from './app.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Chat';

  constructor(public authService: AuthService, private router: Router, public af: AngularFireAuth, private db: AngularFirestore, private appService: AppService) {
  }
ngOnInit(){

}
}
