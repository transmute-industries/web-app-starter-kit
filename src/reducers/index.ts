import {characters} from './characters';
import {characterDetails} from './characterDetails';
import {users} from './users';
import {comments} from './comments';
import {StoreState} from '../types/index';
import {ratings} from './ratings';

import {  routerReducer } from 'react-router-redux';


function rootReducer(
  state: StoreState,
  action: any
) {
  return {
    router: routerReducer,
    characters: characters(state.characters, action),
    characterDetails: characterDetails(state.characterDetails, action),
    users: users(state.users, action),
    comments: comments(state, action),
    ratings: ratings(state, action),
  };
}

export default rootReducer;
