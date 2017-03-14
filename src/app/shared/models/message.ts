import {Partner} from './partner';

export interface Message {
  _id: string;
  sender: Partner;
  time: number;
  text: string;
}
