import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Http, HttpModule, RequestOptions } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { AuthHttp } from 'angular2-jwt';

import { AppRoutingModule } from './app-routing.module'; 
import { AppComponent } from './app.component';
import { HomeComponent } from './home';
import { PartnerSearchComponent } from './partnerSearch';
import { AuthService, WebSocketService } from './shared/services';
import { PartnershipService } from './partnership';
import { authHttpServiceFactory } from './shared/helpers';
import { InviteComponent } from './invite/invite.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PartnerSearchComponent,
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
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
