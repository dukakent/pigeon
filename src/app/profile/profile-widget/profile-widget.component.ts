import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Profile } from '../../shared/models/profile';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-profile-widget',
  templateUrl: './profile-widget.component.html',
  styleUrls: ['./profile-widget.component.scss']
})
export class ProfileWidgetComponent {

  profile: Profile;

  constructor(private auth: AuthService) {
    this.profile = auth.profile;
  }

  onLogoutClick() {
    this.auth.logout();
  }

}
