import * as React from 'react';
import {shallow} from 'enzyme';
import {Characters} from './Characters';

const props = {
  characters: [{
    id: 'N',
    name: 'N',
    gender: 'N',
    rating: 0,
  }],
  onCharacterClick: () => {}
};

describe('Characters', () => {
  it('Does not crash', () => {
    expect(shallow(
      <Characters {...props} />
    ).length).toEqual(1);
  });
});
