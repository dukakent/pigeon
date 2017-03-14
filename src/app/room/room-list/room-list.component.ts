import {Component} from '@angular/core';
import {RoomService} from '../room.service';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html'
})
export class RoomListComponent {

  public rooms;

  constructor(private roomService: RoomService) {
    this.rooms = this.roomService.rooms;
  }
}
