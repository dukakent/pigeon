import { Partner } from './partner';

export interface Invite {
  _id: string;
  from: Partner;
  to: Partner;
  status: 'pending' | 'approved' | 'rejected';
}
