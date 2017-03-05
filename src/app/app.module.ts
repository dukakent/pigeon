import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Http, HttpModule, RequestOptions } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { AuthHttp } from 'angular2-jwt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './signin/signin.component';
import { HomeComponent } from './home';
import { AuthService, WebSocketService } from './shared/services';
import { AuthedUserGuard, GuestUserGuard } from './shared/guards'; 
import { PartnershipService, PartnerSearchComponent, PartnerListComponent } from './partnership';
import { authHttpServiceFactory } from './shared/helpers';
import { InviteComponent, InviteService } from './invite';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    HomeComponent,
    PartnerSearchComponent,
    PartnerListComponent,
    InviteComponent
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
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
