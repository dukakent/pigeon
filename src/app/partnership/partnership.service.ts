import { Injectable } from '@angular/core';
import { User } from '../shared/models';
import { AuthHttp } from 'angular2-jwt';
import { AuthService } from '../shared/services';

@Injectable()
export class PartnershipService {

  private knownPartners;
  private unknownPartners;

  constructor(private authHttp: AuthHttp, private authService: AuthService) {
    this.reset();
  }

  getByIds(ids) {
    for (let id of ids) {
      this.authHttp.get('api/user/' + id)
        .map(res => res.json())
        .subscribe(this.spread);
    }
  }

  private spread(partner) {
    const isKnown = this.authService.profile.partners.indexOf(partner._id) >= 0;

    if (isKnown) {
      this.knownPartners = partner;
    } else {
      this.unknownPartners = partner;
    }
  }

  reset() {
    this.knownPartners = [];
    this.unknownPartners = [];
  }
}
