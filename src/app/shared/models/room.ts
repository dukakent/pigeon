import { Partner } from './partner';
import { Message } from './message';

export class Room {
  _id: string;
  name: string;
  participants: Partner[];
  messages: Message[];
}
