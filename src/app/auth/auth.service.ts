import { Injectable } from '@angular/core';
import { AuthHttp, tokenNotExpired } from 'angular2-jwt';
import { Http, Headers } from '@angular/http';
import { WebSocketService } from '../ws/websocket.service';
import { Router } from '@angular/router';

declare const Auth0Lock: any;

@Injectable()
export class AuthService {

  public profile;
  public token;
  private lock;

  constructor(
    private authHttp: AuthHttp,
    private http: Http,
    private ws: WebSocketService,
    private router: Router
  ) {
    this.profile = JSON.parse(localStorage.getItem('profile'));
    this.token = localStorage.getItem('id_token');

    if (this.token) {
      this.ws.authenticate(this.token);
    }

    this.lock = new Auth0Lock('QknQ2gxsD5g9gszEIuH4AogrCp1hrbFK', 'dukakent.auth0.com', {
      autoclose: true,
      additionalSignUpFields: [
        {
          name: 'name',
          placeholder: 'Enter your name'
        }
      ],
      auth: {
        redirect: false,
        sso: false
      }
    });

    this.lock.on('authenticated', (authResult) => {
      this.token = authResult.idToken;
      localStorage.setItem('id_token', this.token);
      this.ws.authenticate(this.token);

      this.lock.getProfile(authResult.idToken, (error, profile) => {
        if (error) {
          return;
        }

        if (profile.user_metadata && profile.user_metadata.name) {
          profile.name = profile.user_metadata.name;
        }

        localStorage.setItem('profile', JSON.stringify(profile));
        this.sync(profile);
      });
    });
  }

  login() {
    this.lock.show();
  }

  isAuthed() {
    return this.profile && tokenNotExpired();
  }

  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
    this.profile = null;
    this.token = null;
    this.router.navigate(['signin']);
  }

  sync(preProfile) {
    const headers = new Headers({ 'Content-Type': 'application/json' });

    this.authHttp
      .post('/api/user', JSON.stringify(preProfile), { headers })
      .map((res) => res.json())
      .subscribe((res) => {
        this.profile = res;
        this.router.navigate(['']);
      });
  }

  getProfile() {
    return this.profile;
  }
}
