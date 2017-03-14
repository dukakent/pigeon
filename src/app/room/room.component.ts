import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoomService } from './room.service';

@Component({
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  public room;

  constructor(private route: ActivatedRoute, private roomService: RoomService) {}

  ngOnInit() {
    this.route.params
      .map(params => params['id'])
      .subscribe(id => {
        this.room = this.roomService.getById(id);
      });
  }

  onNewMessage(message) {
    this.roomService.createNewMessage(this.room, message);
  }
}
