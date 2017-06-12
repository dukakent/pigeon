import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Http, HttpModule, RequestOptions } from '@angular/http';
import {
  MdCardModule, MdMenuModule, MdInputModule, MdButtonModule, MdTabsModule,
  MdDialogModule
} from '@angular/material';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
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
import { RoomService } from './room/room.service';
import { RoomListComponent } from './room/room-list/room-list.component';
import { RoomControlComponent } from './room/room-control/room-control.component';
import { ProfileWidgetComponent } from './profile/profile-widget/profile-widget.component';
import { HeaderComponent } from './header/header.component';
import { CallComponent } from './call/call.component';
import { CallService } from './call/call.service';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    HeaderComponent,
    HomeComponent,
    ProfileWidgetComponent,
    PartnerSearchComponent,
    PartnerListComponent,
    InviteComponent,
    RoomComponent,
    RoomListComponent,
    RoomControlComponent,
    CallComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    MdCardModule,
    MdMenuModule,
    MdInputModule,
    MdButtonModule,
    MdTabsModule,
    MdDialogModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    ButtonsModule.forRoot()
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
    RoomService,
    CallService
  ],
  bootstrap: [AppComponent],
  entryComponents: [ CallComponent ]
})
export class AppModule { }
