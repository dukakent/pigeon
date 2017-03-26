import { Component, Output, EventEmitter } from '@angular/core';
import { Message } from '../../shared/models/message';


@Component({
  selector: 'app-room-control',
  templateUrl: './room-control.component.html',
  styleUrls: ['./room-control.component.scss']
})
export class RoomControlComponent {

  public text: string;

  @Output() public message: EventEmitter<any>;
  @Output() public call: EventEmitter<any>;

  constructor() {
    this.message = new EventEmitter<any>();
    this.call = new EventEmitter<any>();
  }

  submit() {
    this.message.emit(this.text);
  }

  makeCall() {
    this.call.emit();
  }
}
