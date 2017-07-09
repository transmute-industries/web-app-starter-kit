import {CharacterState} from '../types/index';
import {
  LOADING_CHARACTERS_SUCCEEDED,
  LOADING_ALL_CHARACTERS_SUCCEEDED,
  SEARCH_CHARACTERS,
  SORT_CHARACTERS_BY_RATING,
} from '../constants/characters';

interface CustomAction {
  type: string;
  characters: CharacterState[];
  term: string;
}

export function characters(state: CharacterState[], action: CustomAction): CharacterState[] {
  switch (action.type) {
    case LOADING_CHARACTERS_SUCCEEDED:
      return state.concat(action.characters);
    case LOADING_ALL_CHARACTERS_SUCCEEDED:
      return state.concat(action.characters);
    case SEARCH_CHARACTERS:
      return state.filter((character) => {
        return character && character.name && character.name.toLowerCase().indexOf(
          action.term.trim().toLowerCase()
        ) !== -1;
      });
    case SORT_CHARACTERS_BY_RATING:
      return state.slice().sort(function(a: CharacterState, b: CharacterState) {
        if (a.rating !== b.rating) {
          return b.rating - a.rating;
        } else {
          // Sort alphabetically when same level
          return a.name < b.name ? -1 : 1;
        }
      });
    default:
      return state ? state : [];
  }
}
