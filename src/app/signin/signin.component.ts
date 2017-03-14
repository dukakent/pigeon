import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  templateUrl: './signin.component.html'
})
export class SigninComponent {

  constructor(public auth: AuthService) {}

}
