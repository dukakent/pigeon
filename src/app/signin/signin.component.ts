import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {

  constructor(private auth: AuthService) {}

  login() {
    this.auth.showLoginDialog();
  }
}
