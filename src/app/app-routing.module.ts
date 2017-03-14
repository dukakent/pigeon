import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { RoomComponent } from './room/room.component';
import { SigninComponent } from './signin/signin.component';
import { PartnerSearchComponent } from './partnership/partner-search/partner-search.component';
import { InviteComponent } from './invite/invite.component';
import { AuthedUserGuard } from './auth/guards/authed-user.guard';
import { GuestUserGuard } from './auth/guards/guest-user.guard';

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
  },
  {
    path: 'room/id/:id',
    component: RoomComponent,
    canActivate: [AuthedUserGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
