import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Http, HttpModule, RequestOptions } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { AuthHttp } from 'angular2-jwt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './signin/signin.component';
import { HomeComponent } from './home/home.component';
import { RoomComponent } from './room/room.component';
import { AuthService } from './auth/auth.service';
import { WebSocketService } from './ws/websocket.service';
import { AuthedUserGuard } from './auth/guards/authed-user.guard';
import { GuestUserGuard } from './auth/guards/guest-user.guard';
import { PartnershipService } from './partnership/partnership.service';
import { PartnerSearchComponent } from './partnership/partner-search/partner-search.component';
import { PartnerListComponent } from './partnership/partner-list/partner-list.component';
import { authHttpServiceFactory } from './shared/helpers/authHttpServiceFactory';
import { InviteComponent } from './invite/invite.component';
import { InviteService } from './invite/invite.service';
import {RoomService} from './room/room.service';
import {RoomListComponent} from './room/room-list/room-list.component';
import {RoomControlComponent} from './room/room-control/room-control.component';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    HomeComponent,
    PartnerSearchComponent,
    PartnerListComponent,
    InviteComponent,
    RoomComponent,
    RoomListComponent,
    RoomControlComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot()
  ],
  providers: [
    AuthService,
    WebSocketService,
    PartnershipService,
    InviteService,
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    },
    AuthedUserGuard,
    GuestUserGuard,
    RoomService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
