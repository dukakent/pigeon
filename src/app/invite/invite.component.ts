import { Component, OnInit } from '@angular/core';
import { InviteService } from './invite.service';
import { Invite } from '../shared/models/invite';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.css']
})
export class InviteComponent {

  private invites: Invite[];

  constructor(private inviteService: InviteService) {
    this.invites = this.inviteService.invites;
  }

  approve(invite) {
    this.inviteService.approve(invite);
  }

  reject(invite) {
    this.inviteService.reject(invite);
  }
}
