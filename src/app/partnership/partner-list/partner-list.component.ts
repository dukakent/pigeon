import { Component } from '@angular/core';
import { PartnershipService } from '../partnership.service';
import { Partner } from '../../shared/models/partner';

@Component({
  selector: 'app-partner-list',
  templateUrl: './partner-list.component.html'
})
export class PartnerListComponent {

  private partners: Partner[];

  constructor(private partnerService: PartnershipService) {
    this.partners = this.partnerService.knownPartners;
  }

  removePartner(partner) {
    this.partnerService.removePartner(partner);
  }
}
