import {CharacterState} from '../types/index';
import {SET_CHARACTER_DETAILS} from '../constants/characterDetails';

interface CustomAction {
  type: string;
  characterDetails: CharacterState;
}

export function characterDetails(state: CharacterState, action: CustomAction): CharacterState {
  switch (action.type) {
    case SET_CHARACTER_DETAILS:
      return Object.assign({}, state, action.characterDetails);
    default:
      return state;
  }
}
