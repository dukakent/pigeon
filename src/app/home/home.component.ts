import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { WebSocketService } from '../ws/websocket.service';
import { Profile } from 'app/shared/models/profile';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  private me: Profile;

  constructor(public auth: AuthService) {
    this.me = this.auth.profile;
  }
}
