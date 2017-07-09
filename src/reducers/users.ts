import {UserState} from '../types/index';
import {LOGIN_AS_USER} from '../constants/users';

interface CustomAction {
  type: string;
  users: UserState[];
  user: UserState;
}

export function users(state: UserState[], action: CustomAction): UserState[] {
  switch (action.type) {
    case LOGIN_AS_USER:
      return state.map((user) => {
        const _user = Object.assign({}, user);
        _user.isLoggedIn = action.user.id === _user.id;
        return _user;
      });
    default:
      return state ? state : [
        {
          id: 1,
          name: 'User 1',
          color: 'red',
          isLoggedIn: true,
        },
        {
          id: 2,
          name: 'User 2',
          color: 'blue',
          isLoggedIn: false,
        },
        {
          id: 3,
          name: 'User 3',
          color: 'green',
          isLoggedIn: false,
        }
      ];
  }
}
