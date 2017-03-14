import { Component } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { URLSearchParams } from '@angular/http';
import { WebSocketService } from '../../shared/services/websocket.service';
import { Partner } from '../../shared/models/partner';

@Component({
  templateUrl: './partner-search.component.html',
  styleUrls: ['./partner-search.component.scss']
})
export class PartnerSearchComponent {
  private matches: Partner[];

  constructor(
    private authHttp: AuthHttp,
    private ws: WebSocketService
  ) {}

  find(q) {
    if (!q) {
      this.matches = [];
      return false;
    }

    const params: URLSearchParams = new URLSearchParams();
    params.set('q', q);

    this.authHttp
      .get('/api/user/search', { search: params })
      .map(res => res.json())
      .subscribe((res) => {
        this.matches = res as Partner[];
      });
  }

  invite(id) {
    this.ws.send('invite', id);
  }
}
