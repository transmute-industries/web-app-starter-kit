import * as React from 'react';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { MuiThemeProvider, lightBaseTheme } from 'material-ui/styles';

const lightMuiTheme = getMuiTheme(lightBaseTheme);

import './UnsafeFactoryDemo.css';

import EventStoreTable from './EventStoreTable/EventStoreTable'

import Paper from 'material-ui/Paper';


export default class UnsafeFactoryDemo extends React.Component<any, any> {
  render() {
    return (
      <div className='material-demo'>

        <MuiThemeProvider muiTheme={lightMuiTheme}>
          <div>
            <Paper zDepth={4} className='factory-description'>
              <h1>Factories</h1>
              Factories allow your dApp users to create instances of your smart contracts.
            </Paper>
            <EventStoreTable />
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}
