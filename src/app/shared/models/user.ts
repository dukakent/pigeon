import { Partner } from './partner';

export interface User extends Partner {
  partners: Partner[]
}
