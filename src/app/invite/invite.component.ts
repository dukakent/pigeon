import { Component, OnInit } from '@angular/core';
import { InviteService } from './invite.service';
import { Invite } from '../shared/models';

@Component({
  selector: 'invite',
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
