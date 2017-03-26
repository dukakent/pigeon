import { Injectable } from '@angular/core';
import { tokenNotExpired, AuthHttp } from 'angular2-jwt';
import { Profile } from 'app/shared/models/profile';
import { Router } from '@angular/router';
import { Headers } from '@angular/http';
import { WebSocketService } from '../ws/websocket.service';

declare const Auth0Lock: any;

@Injectable()
export class AuthService {

  public profile: Profile;
  private token: string;
  private lock;

  constructor(
    private authHttp: AuthHttp,
    private router: Router,
    private ws: WebSocketService
  ) {

    if (this.isAuthed()) {
      const auth0Profile = JSON.parse(localStorage.getItem('profile'));
      this.profile = this.createProfileFromAuth0(auth0Profile);
      this.token = localStorage.getItem('id_token');
      this.ws.authenticate(this.token);
    }

    this.lock = new Auth0Lock('QknQ2gxsD5g9gszEIuH4AogrCp1hrbFK', 'dukakent.auth0.com', {
      autoclose: true,
      additionalSignUpFields: [
        {
          name: 'name',
          placeholder: 'Enter your full name'
        }
      ],
      auth: {
        redirect: false,
        sso: false
      }
    });

    this.lock.on('authenticated', (authResult) => {
      this.lock.getProfile(authResult.idToken, (error, profile) => {
        if (error) {
          return;
        }

        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('profile', JSON.stringify(profile));
        this.profile = this.createProfileFromAuth0(profile);
        this.ws.authenticate(authResult.idToken);
        this.sync(this.profile);
        this.router.navigate(['']);
      });
    });
  }

  private createProfileFromAuth0(auth0Profile): Profile {
    return {
      _id: auth0Profile.user_id,
      email: auth0Profile.email,
      name: auth0Profile.user_metadata.name,
      ava: ''
    }
  }

  private sync(profile: Profile) {
    const headers = new Headers({ 'Content-Type': 'application/json' });

    this.authHttp
      .post('/api/user', JSON.stringify(profile), headers)
      .map((res) => res.json())
      .subscribe((upProfile) => Object.assign(profile, upProfile));
  }

  showLoginDialog() {
    this.lock.show();
  }

  isAuthed() {
    return tokenNotExpired();
  }

  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
    this.profile = null;
    this.router.navigate(['signin']);
  }
}
