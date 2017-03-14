import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { WebSocketService } from '../ws/websocket.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(public auth: AuthService, private ws: WebSocketService) {}
}
