import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

import {Observable} from 'rxjs';
import 'rxjs/add/observable/from';
// import {Observable} from 'rxjs/Rx';
// import { from } from 'rxjs';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
constructor(private auth: AngularFireAuth, private router: Router) {}

// canActivate(
//   next: ActivatedRouteSnapshot,
//   state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
//
//     return true;
//   }
    canActivate(): Observable<boolean>  | Promise<boolean> | boolean{
      return Observable.from(this.auth)
        .take(1)
        .map(state => !!state)
        .do(authenticated => {
      if
        (!authenticated) this.router.navigate([ '/login-email' ]);
      })
    }
}
