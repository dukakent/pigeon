import { Injectable } from '@angular/core';
import { User } from '../shared/models/user';
import { AuthHttp } from 'angular2-jwt';
import { AuthService } from '../shared/services/auth.service';
import { Partner } from '../shared/models/partner';
import { WebSocketService } from '../shared/services/websocket.service';

@Injectable()
export class PartnershipService {

  private knownPartnersStream;

  knownPartners: Partner[];
  unknownPartners: Partner[];

  constructor(private authHttp: AuthHttp, private authService: AuthService, private ws: WebSocketService) {
    this.knownPartners = [];
    this.unknownPartners = [];

    this.ws
      .listen('partner/new')
      .subscribe((partner) => {
        this.knownPartners.push(partner);
      });

    this.ws
      .listen('partner/remove')
      .subscribe((id) => {
        const removingPartner = this.knownPartners.find(partner => partner._id === id);
        this.remove(removingPartner);
      });

    this.fetch();
  }

  getByIds(ids) {
    for (const id of ids) {
      this.authHttp.get('api/user/' + id)
        .map(res => res.json())
        .subscribe(this.spread);
    }
  }

  fetch() {
    this.authHttp.get('api/partner/myPartners')
      .map(res => res.json())
      .subscribe((res: Partner[]) => {
        res.forEach((partner) => {
          this.knownPartners.push(<Partner> partner);
        });
      });
  }

  removePartner(partner) {
    this.ws.send('partner/remove', partner._id);
    this.remove(partner);
  }

  remove(partner) {
    const partnerIndex = this.knownPartners.indexOf(partner);
    this.knownPartners.splice(partnerIndex, 1);
  }

  private spread(partner) {
    const isKnown = this.authService.profile.partners.indexOf(partner._id) >= 0;

    if (isKnown) {
      this.knownPartners = partner;
    } else {
      this.unknownPartners = partner;
    }
  }
}
