import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
// for auth
import { AngularFireAuthModule } from 'angularfire2/auth';
// for database
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { EmailComponent } from './email/email.component';
import { SignupComponent } from './signup/signup.component';
import { MembersComponent } from './members/members.component';
import { RouterModule } from '@angular/router';
import { routingComponents } from './app.routes';
import { RoutesModule } from './app.routes';
import { AuthService } from './auth.service';
import { routes } from './app.routes';

export const firebaseConfig = {
  apiKey: "AIzaSyDYxbDw2atup9Fgoz5S2tPPPVeKH9rG0qE",
  authDomain: "first-firebase-project-483fa.firebaseapp.com",
  databaseURL: "https://first-firebase-project-483fa.firebaseio.com",
  projectId: "first-firebase-project-483fa",
  storageBucket: "first-firebase-project-483fa.appspot.com",
  messagingSenderId: "1051571622027"
}
@NgModule({
  declarations: [
    AppComponent,
    routingComponents
  ],
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    RoutesModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
