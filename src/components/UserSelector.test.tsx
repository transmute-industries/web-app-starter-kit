import * as React from 'react';
import {shallow} from 'enzyme';
import {UserSelector} from './UserSelector';

describe('UserSelector', () => {
  const props = {
    users: [],
    loginAsUser(){}
  };

  it('Does not crash', () => {
    expect(shallow(
      <UserSelector {...props} />
    ).length).toEqual(1);
  });
});
