import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Injectable()
export class AuthedUserGuard implements CanActivate {

  constructor(private router: Router, private auth: AuthService) {}

  canActivate() {
    const isSignedIn = this.auth.isAuthed();

    if (!isSignedIn) {
      this.router.navigate(['signin']);
    }

    return true;
  }

}
