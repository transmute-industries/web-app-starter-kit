import * as React from 'react';
import {shallow, mount} from 'enzyme';
import {CommentEditor} from './CommentEditor';

describe('CommentEditor', () => {
  const props = {
    onCommentSubmit: () => {}
  };

  it('Does not crash', () => {
    expect(shallow(
      <CommentEditor {...props} />
    ).length).toEqual(1);
  });

  it('Call onCommentSubmit on Enter', () => {
    const mockCallback = jest.fn();

    mount(
      <CommentEditor
        onCommentSubmit={() => mockCallback()}
      />
    ).find('input').simulate('keyDown', {which: 13});

    expect(mockCallback.mock.calls.length).toBe(1);
  });
});
