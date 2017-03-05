import { Component } from '@angular/core';
import { AuthService } from '../shared/services';

@Component({
  templateUrl: './signin.component.html'
})
export class SigninComponent {

  constructor(private auth: AuthService) {}

}
