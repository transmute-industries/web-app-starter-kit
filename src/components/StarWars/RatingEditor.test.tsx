import * as React from 'react';
import {shallow} from 'enzyme';
import {RatingEditor} from './RatingEditor';

describe('RatingEditor', () => {
  const props = {
    onSetRating: () => {},
  };

  it('Does not crash', () => {
    expect(shallow(
      <RatingEditor {...props} />
    ).length).toEqual(1);
  });
});
