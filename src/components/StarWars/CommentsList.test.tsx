import * as React from 'react';
import {shallow} from 'enzyme';
import {CommentsList} from './CommentsList';

const props = {
  comments: []
};

describe('CommentsList', () => {
  it('Does not crash', () => {
    expect(shallow(
      <CommentsList {...props} />
    ).length).toEqual(1);
  });
});
