import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoomService } from './';

@Component({
  templateUrl: './room.component.html'
})
export class RoomComponent implements OnInit {

  private sub;
  private room;
  
  constructor(private roomService: RoomService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.room = this.roomService.getById(params['id']);
    });
  }

}
