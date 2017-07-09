import * as React from 'react';
import {shallow} from 'enzyme';
import {Character} from './Character';

describe('Character', () => {
  const props = {
    id: 'A',
    name: 'A',
    gender: 'A',
    rating: 0,
    onCharacterClick: () => {}
  };

  it('Does not crash', () => {
    expect(shallow(
      <Character {...props} />
    ).length).toEqual(1);
  });

  it('Sets character detail on click', () => {
    const mockCallback = jest.fn();

    shallow(
      <Character
        {...props}
        onCharacterClick={() => mockCallback()}
      />
    ).find('div').simulate('click');

    expect(mockCallback.mock.calls.length).toBe(1);
  });
});
