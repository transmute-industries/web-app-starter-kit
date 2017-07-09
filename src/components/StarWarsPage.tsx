import * as React from 'react';

import AppConnected from '../containers/StarWars/App';

export default class StarWarsPage extends React.Component<any, any> {
  render () {
    return (
      <div>
       <AppConnected />
      </div>
    );
  }
}
