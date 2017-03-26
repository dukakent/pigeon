import {Injectable, OnInit} from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { WebSocketService } from '../ws/websocket.service';
import { Room } from '../shared/models/room';
import { AuthService } from 'app/auth/auth.service';
import { Profile } from 'app/shared/models/profile';

@Injectable()
export class RoomService {

  private me: Profile;
  public rooms;
  public roomsStream;

  constructor(
    private auth: AuthService,
    private authHttp: AuthHttp,
    private ws: WebSocketService
  ) {
    this.rooms = [];
    this.me = this.auth.profile;

    this.ws.listen('room/new').subscribe(room => this.rooms.push(room));
    this.ws.listen('room/remove').subscribe(roomId => this.remove(roomId));
    this.ws.listen('message/new').subscribe(message => this.addMessageInRoom(message));

    this.roomsStream = this.authHttp
      .get('/api/room/myRooms')
      .map(rooms => rooms.json());

    this.roomsStream.subscribe(rooms => this.addMany(rooms as Room[]));
  }

  getById(id) {
    return this.rooms.find(room => room._id === id);
  }

  add(room: Room) {
    this.rooms.push(room);
    this.authHttp
      .get('/api/room/id/' + room._id + '/messages')
      .map(rooms => rooms.json())
      .subscribe((messages) => {
        room.messages = messages;
      });
  }

  addMany(rooms: Room[]) {
    rooms.forEach(room => this.add(room));
  }

  remove(id) {
    const room = this.getById(id);
    const index = this.rooms.indexOf(room);
    this.rooms.splice(index, 1);
  }

  addMessageInRoom(message) {
    this.getById(message.room._id).messages.push(message);
  }

  createNewMessage(room, messageText) {
    const message = {
      sender: this.me._id,
      time: Date.now(),
      text: messageText,
      room: room._id
    };

    this.ws.send('message/new', message);
  }
}
