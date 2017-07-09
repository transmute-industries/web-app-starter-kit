import * as React from 'react';
import {shallow} from 'enzyme';
import {CharacterDetails} from './CharacterDetails';

const props = {
  characterDetails: {
    id: 'A',
    name: 'A',
    gender: 'A',
    rating: 0,
  },
  comments: [],
  users: [
    {
      id: 0,
      name: 'User 0',
      color: 'orange',
      isLoggedIn: true,
    }
  ],
  ratings: {},
  loginAsUser(){},
  submitComment(){},
  setRating(){},
};

describe('CharacterDetails', () => {
  it('Does not crash', () => {
    expect(shallow(
      <CharacterDetails {...props}/>
    ).length).toEqual(1);
  });
});
