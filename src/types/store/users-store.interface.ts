import {UserInterface} from '@/types/user.interface';

export interface UsersStoreInterface {
  users: UserInterface[];
  currentUser: UserInterface;
}
