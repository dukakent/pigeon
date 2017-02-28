import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { AuthService } from '../shared/services';

@Injectable()
export class RoomService {

  private rooms;

  constructor(private authHttp: AuthHttp, private authService: AuthService) {
  }

  getRooms() {
    this.authHttp.get('/user/rooms')
      .map(res => res.json())
      .subscribe((res) => {
        this.rooms = res;
      });
  }

}
