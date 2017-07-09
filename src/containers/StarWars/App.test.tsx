import * as React from 'react';
import { shallow } from 'enzyme';
import { App } from './App';

const character = {
  id: 'A',
  name: 'A',
  gender: 'A',
  rating: 0,
};

const props = {
  characterDetails: character,
  characters: [character],
  users: [
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
    }
  ],
  comments: [],
  ratings: {},
  dispatch: () => ({})
};

describe('App', () => {
  it('Does not crash', () => {
      expect(shallow(<App {...props}/>).length).toBe(1);
  });

  it('Loads characters on mount');
});
