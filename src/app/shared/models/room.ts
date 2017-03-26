import { Partner } from './partner';
import { Message } from './message';

export interface Room {
  _id: string;
  name: string;
  participants: Partner[];
  messages: Message[];
}
