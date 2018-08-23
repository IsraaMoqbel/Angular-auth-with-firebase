import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MembersComponent } from './members/members.component';
import { AuthGuard } from './auth.service';
import { SignupComponent } from './signup/signup.component';
import { EmailComponent } from './email/email.component';
import { NgModule } from '@angular/core';

export const router: Routes = [
    { path: '', redirectTo: 'login-email', pathMatch: 'full' },
    // { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'login-email', component: EmailComponent },
    { path: 'members', component: MembersComponent, canActivate: [AuthGuard]
  }

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
export const routingComponents = [SignupComponent, EmailComponent, MembersComponent ]
