import { Component } from '@angular/core';
import { AuthService, WebSocketService } from '../shared/services';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(private auth: AuthService, private ws: WebSocketService) {}
}
