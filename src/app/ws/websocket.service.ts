import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import * as io from 'socket.io-client';

@Injectable()
export class WebSocketService {

  private socket;

  constructor() {
    this.socket = io();
  }

  authenticate(token) {
    this.socket.emit('authenticate', { token: token });
  }

  listen(channel) {
    return Observable.create(observer => {
      this.socket.on(channel, (data) => {
        observer.next(data);
      });
    });
  }

  send(channel, data) {
    this.socket.emit(channel, data);
  }

}
