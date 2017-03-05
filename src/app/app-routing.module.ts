import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthService } from './shared/services';
import { HomeComponent } from './home';
import { SigninComponent } from './signin/signin.component';
import { PartnerSearchComponent } from './partnership';
import { InviteComponent } from './invite/invite.component';
import { AuthedUserGuard, GuestUserGuard } from './shared/guards'; 

export const routes: Routes = [
  {
    path: 'signin',
    component: SigninComponent,
    canActivate: [GuestUserGuard]
  },
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthedUserGuard]
  },
  {
    path: 'search',
    component: PartnerSearchComponent,
    canActivate: [AuthedUserGuard]
  },
  {
    path: 'invite',
    component: InviteComponent,
    canActivate: [AuthedUserGuard]
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
