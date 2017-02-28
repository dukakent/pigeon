import { Room } from './';

interface User {
  id: string,
  email: string,
  name: string,
  status: 'online' | 'offline'
}

interface UserProfile extends User {
  partners: User[],
  rooms: Room[]
}

export {User, UserProfile }
