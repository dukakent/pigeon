import { Component, Output, EventEmitter } from '@angular/core';
import { Message } from '../../shared/models/message';


@Component({
  selector: 'app-room-control',
  templateUrl: './room-control.component.html',
  styleUrls: ['./room-control.component.scss']
})
export class RoomControlComponent {

  public text: string;

  @Output() public message;

  constructor() {
    this.message = new EventEmitter<Message>();
  }

  submit() {
    this.message.emit(this.text);
  }
}
