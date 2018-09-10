import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { MembersComponent } from './members/members.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { SignupComponent } from './signup/signup.component';
import { EmailComponent } from './email/email.component';
import { UsersComponent } from './users/users.component';
import { NgModule } from '@angular/core';

export const router: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: EmailComponent },
  {
    path: 'chat', component: MembersComponent
    , canActivate: [AuthGuard]
  },
  { path: 'user/:username', component: UserprofileComponent },
    { path: 'users', component: UsersComponent },
    {path:'**', redirectTo:'login'}
]

@NgModule({
  imports: [
    RouterModule.forRoot(router)
  ],
  exports: [
    RouterModule
  ]
})

export class RoutesModule { }
export const routes: ModuleWithProviders = RouterModule.forRoot(router);
export const routingComponents = [SignupComponent, EmailComponent, MembersComponent,UserprofileComponent]
