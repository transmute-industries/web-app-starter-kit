import * as React from 'react';
import {shallow} from 'enzyme';
import {Editor} from './Editor';

describe('Editor', () => {
  const props = {
    users: [],
    loginAsUser(){},
    submitComment(){},
    setRating(){},
  };

  it('Does not crash', () => {
    expect(shallow(
      <Editor {...props} />
    ).length).toEqual(1);
  });
});
