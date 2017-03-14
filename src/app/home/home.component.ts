import { Component } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { WebSocketService } from '../shared/services/websocket.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(public auth: AuthService, private ws: WebSocketService) {}
}
