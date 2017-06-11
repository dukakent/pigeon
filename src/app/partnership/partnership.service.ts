import { Injectable } from '@angular/core';
import { Profile } from '../shared/models/profile';
import { AuthHttp } from 'angular2-jwt';
import { AuthService } from '../auth/auth.service';
import { Partner } from '../shared/models/partner';
import { WebSocketService } from '../ws/websocket.service';
import { RoomService } from '../room/room.service';

@Injectable()
export class PartnershipService {

  private knownPartnersStream;

  knownPartners: Partner[] = [
    {
      _id: '',
      email: '',
      name: 'Steve Doe',
      status: 'offline'
    },
    {
      _id: '',
      email: '',
      name: 'Bill Hopkins',
      status: 'online'
    },
    {
      _id: '',
      email: '',
      name: 'David Gates',
      status: 'online'
    },
    {
      _id: '',
      email: '',
      name: 'Dmytro Shpak',
      status: 'offline'
    },
    {
      _id: '',
      email: '',
      name: 'Vladimir Sverdlov',
      status: 'offline'
    },
    {
      _id: '',
      email: '',
      name: 'Anna Sova',
      status: 'online'
    }
  ];

  unknownPartners: Partner[];

  constructor(private authHttp: AuthHttp, private ws: WebSocketService, private roomService: RoomService) {
    // this.knownPartners = [];
    // this.unknownPartners = [];
    //
    // this.ws
    //   .listen('partner/new')
    //   .subscribe((partner) => {
    //     this.knownPartners.push(partner);
    //   });
    //
    // this.ws
    //   .listen('partner/remove')
    //   .subscribe((id) => {
    //     const removingPartner = this.knownPartners.find(partner => partner._id === id);
    //     this.remove(removingPartner);
    //   });
    //
    // this.fetch();
  }

  getByIds(ids) {
    // for (const id of ids) {
    //   this.authHttp.get('api/user/' + id)
    //     .map(res => res.json())
    //     .subscribe(this.spread);
    // }
  }

  fetch() {
    // this.authHttp.get('api/partner/myPartners')
    //   .map(res => res.json())
    //   .subscribe((res: Partner[]) => {
    //     res.forEach((partner) => {
    //       this.knownPartners.push(<Partner> partner);
    //     });
    //   });
  }

  removePartner(partner) {
    // this.ws.send('partner/remove', partner._id);
    // this.remove(partner);
  }

  remove(partner) {
    // const partnerIndex = this.knownPartners.indexOf(partner);
    // // this.roomService.rooms.find(room => room.)
    // this.knownPartners.splice(partnerIndex, 1);
  }

  private spread(partner) {
    // const isKnown = this.authService.profile.partners.indexOf(partner._id) >= 0;

    // if (isKnown) {
    //   this.knownPartners = partner;
    // } else {
    //   this.unknownPartners = partner;
    // }

    // this.knownPartners = partner;
  }
}
