import { CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from "angularfire2/auth";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

@Injectable()
export class AuthService {

  constructor(private af: AngularFireAuth, private router: Router) {
    this.af.auth.onAuthStateChanged(auth => {
      if (!auth) {
        console.log('not authorized')
      } else {
        console.log('auth in service', auth)
        this.router.navigate(['/members']);

      }
    });
  }

  loginWithEmail(email, password) {
    return this.af.auth.signInWithEmailAndPassword(email, password);
  }
  logout() {
    return this.af.auth.signOut()
  }


}
