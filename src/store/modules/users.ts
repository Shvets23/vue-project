import {UserInterface} from '@/types/user.interface';
import {UsersStoreInterface} from '@/types/store/users-store.interface';

const usersStore = {
  namespaced: true,
  state: {
    users: [
      {
        id: 1,
        userName: 'Test User',
        openedTasks: 0,
        completedTasks: 1,
        avatar: 'girl2.jpeg',
      },
      {
        id: 2,
        userName: 'Test User',
        openedTasks: 0,
        completedTasks: 1,
        avatar: 'girl3.jpg',
      },
      {
        id: 3,
        userName: 'Test User',
        openedTasks: 0,
        completedTasks: 1,
        avatar: 'man.jpg',
      },
    ] as UserInterface[],
    currentUser: {
      userName: 'Jean Gonzales',
      userRole: 'Product Owner',
      openedTasks: 5,
      completedTasks: 375,
      avatar: 'girl1.jpg',
      id: 1,
    },
  },
  getters: {
    getUsers(state: UsersStoreInterface): UserInterface[] {
      return state.users;
    },
    getMe(state: UsersStoreInterface): UserInterface {
      return state.currentUser;
    },
  },
};

export default usersStore;
