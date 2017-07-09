import {Action, Dispatch, bindActionCreators} from 'redux';
import {
  LOADING_CHARACTERS_SUCCEEDED,
  LOADING_ALL_CHARACTERS_SUCCEEDED,
  SEARCH_CHARACTERS,
  SORT_CHARACTERS_BY_RATING,
} from '../constants/characters';
import {CharacterState} from '../types/index';

export const loadingCharactersSucceeded = (characters: CharacterState[]) => ({
  type: LOADING_CHARACTERS_SUCCEEDED,
  characters
});

const BASE_URL = 'https://swapi.co/api/people';

export const loadCharactersPage = (page: number) => (dispatch: Dispatch<Action>) => {
  return fetch(`${BASE_URL}?page=${page}`)
  .then((response) => response.json())
  .then((json) => {
    const characters = json.results.map((character: any) => {
      return {
        id: character.url,
        name: character.name,
        gender: character.gender,
        rating: 0,
      };
    });

    dispatch(
      loadingCharactersSucceeded(characters)
    );

    return characters;
  });
};

export const loadAllCharacters = () => (dispatch: Dispatch<Action>) => {
  return Promise.all(
    [1, 2, 3, 4, 5, 6, 7, 8, 9].map((page) => {
      return bindActionCreators(loadCharactersPage, dispatch)(page);
    })
  )
  .then(
    () => {
      dispatch({
        type: LOADING_ALL_CHARACTERS_SUCCEEDED
      });

      dispatch({
        type: SORT_CHARACTERS_BY_RATING
      });
    }
  );
};

export const searchCharacters = (term: string) => {
  return {
    type: SEARCH_CHARACTERS,
    term
  };
};
