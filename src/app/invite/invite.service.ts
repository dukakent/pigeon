import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { WebSocketService } from '../shared/services';
import { Invite } from '../shared/models';

@Injectable()
export class InviteService {

  private inviteStream;

  invites: Invite[];

  constructor(private ws: WebSocketService, private authHttp: AuthHttp) {
    this.invites = [];
    this.inviteStream = this.ws.listen('invite');

    this.authHttp
      .get('api/invite/received')
      .map(res => res.json())
      .subscribe(res => {
        res.forEach((invite) => {
          this.invites.unshift(invite as Invite);
        });

        this.inviteStream.subscribe(data => {
          this.invites.unshift(data as Invite);
        });
      });
  }

  approve(invite) {
    this.ws.send('invite/approve', invite._id);
    this.removeInvite(invite);
  }

  reject(invite) {
    this.ws.send('invite/reject', invite._id);
    this.removeInvite(invite);
  }

  removeInvite(invite) {
    const inviteIndex = this.invites.indexOf(invite);
    this.invites.splice(inviteIndex, 1);
  }
}
