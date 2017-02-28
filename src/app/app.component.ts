import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/services';
import { PartnershipService } from './partnership';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private auth: AuthService) {}

}
