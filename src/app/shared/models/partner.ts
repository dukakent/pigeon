export interface Partner {
  _id: string;
  email: string;
  name: string;
  status: 'online' | 'offline';
}