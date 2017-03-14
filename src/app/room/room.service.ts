import {Injectable, OnInit} from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { WebSocketService } from '../shared/services/websocket.service';
import { Room } from '../shared/models/room';
import {AuthService} from '../shared/services/auth.service';

@Injectable()
export class RoomService {

  private me;
  public rooms;

  constructor(private authHttp: AuthHttp, private authService: AuthService, private ws: WebSocketService) {
    this.rooms = [];
    this.me = this.authService.getProfile();

    this.ws.listen('room/new').subscribe(room => this.rooms.push(room));
    this.ws.listen('message/new').subscribe(message => this.addMessageInRoom(message));

    this.fetch();
  }

  fetch() {
    this.authHttp
      .get('/api/room/myRooms')
      .map(rooms => rooms.json())
      .subscribe(rooms => this.addMany(rooms as Room[]));
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
      sender: this.me.user_id,
      time: Date.now(),
      text: messageText,
      room: room._id
    };

    this.ws.send('message/new', message);
  }
}
