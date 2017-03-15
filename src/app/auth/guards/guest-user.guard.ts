import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable()
export class GuestUserGuard implements CanActivate {

  constructor(private router: Router, private auth: AuthService) {}

  canActivate() {
    const isSignedIn = this.auth.isAuthed();

    if (isSignedIn) {
      this.router.navigate(['']);
    }

    return !isSignedIn;
  }

}
