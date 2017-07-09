import {SET_CHARACTER_DETAILS} from '../constants/characterDetails';
import {CharacterState} from '../types/index';

export const setCharacterDetails = (characterDetails: CharacterState) => {
  return {
    type: SET_CHARACTER_DETAILS,
    characterDetails
  };
};
