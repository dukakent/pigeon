import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoomService } from './room.service';
import { MdDialog } from '@angular/material';
import { CallComponent } from '../call/call.component';

@Component({
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent {

  public room;

  constructor(
    private route: ActivatedRoute,
    private roomService: RoomService,
    private callDialog: MdDialog
  ) {
    this.route.params
      .map(params => params['id'])
      .subscribe(id => {
        this.room = this.roomService.getById(id);

        if (!this.room) {
          this.roomService.roomsStream
            .filter(room => {
              const tmp = room._id === id;
              return tmp;
            })
            .subscribe(room => {
              this.room = room;
            });
        }
      });
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
