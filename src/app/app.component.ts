import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  mobileSidebarShown = false;

  constructor(public auth: AuthService) {

  }

  toggleMobileSidebar() {
    this.mobileSidebarShown = !this.mobileSidebarShown;
  }
}
