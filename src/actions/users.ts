import {LOGIN_AS_USER} from '../constants/users';
import {UserState} from '../types/index';

export const loginAsUser = (user: UserState) => {
  return {
    type: LOGIN_AS_USER,
    user
  };
};
