import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private af: AngularFireAuth, private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    console.log('can activate', this.af.auth.currentUser)
    return true

    // return Observable.from(this.af)
    //   .take(2)
    //   .map(state => !!state)
    //   .do(authenticated => {
    // if
    //   (!authenticated) this.router.navigate([ '/login' ]);
    // })
  }

}
