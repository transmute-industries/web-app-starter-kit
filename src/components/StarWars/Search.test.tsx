import * as React from 'react';
import {shallow, mount} from 'enzyme';
import {Search} from './Search';

describe('Search', () => {
  const props = {
    onSearch: () => {}
  };

  it('Does not crash', () => {
    expect(shallow(
      <Search {...props} />
    ).length).toEqual(1);
  });

  it('Call onSearch on Enter', () => {
    const mockCallback = jest.fn();

    mount(
      <Search
        {...props}
        onSearch={() => mockCallback()}
      />
    ).find('input')
      .simulate('keyDown', {which: 13});

    expect(mockCallback.mock.calls.length).toBe(1);
  });
});
