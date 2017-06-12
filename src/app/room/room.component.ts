import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoomService } from './room.service';
import { MdDialog } from '@angular/material';
import { CallComponent } from '../call/call.component';
import { CallService } from '../call/call.service';

@Component({
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent {

  public room = {
    name: 'Remote Team',
    participants: [
      {
        name: 'Steve Doe',
        status: 'offline'
      },
      {
        name: 'Bill Hopkins',
        status: 'online'
      },
      {
        name: 'David Gates',
        status: 'online'
      }
    ],
    messages: [
      {
        sender: {
          name: 'Steve Doe',
          ava: 'assets/img/p1.jpg'
        },
        text: 'Hi Inokentii! Are you here?'
      },
      {
        sender: {
          name: 'Inokentii Duka',
          ava: 'assets/img/kent.jpg'
        },
        text: 'Hello Steve! Nice to hear you. I\'m here. How can I help you?'
      }
    ]
  };

  constructor(
    private route: ActivatedRoute,
    private roomService: RoomService,
    private callDialog: MdDialog,
    private callService: CallService
  ) {
    // this.route.params
    //   .map(params => params['id'])
    //   .subscribe(id => {
    //     this.room = this.roomService.getById(id);
    //
    //     if (!this.room) {
    //       this.roomService.roomsStream
    //         .filter(room => room._id === id)
    //         .subscribe(room => {
    //           this.room = room;
    //         });
    //     }
    //   });
  }

  onNewMessage(message) {
    this.roomService.createNewMessage(this.room, message);
  }

  makeCall() {
    this.callDialog.open(CallComponent, {
      height: '90vh',
      width: '90vw',
      disableClose: true
    });
  }
}
