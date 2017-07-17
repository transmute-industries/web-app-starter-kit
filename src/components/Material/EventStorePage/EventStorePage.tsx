import * as React from 'react';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { MuiThemeProvider, lightBaseTheme } from 'material-ui/styles';

const lightMuiTheme = getMuiTheme(lightBaseTheme);

import './EventStorePage.css';

import EventStoreReadModelTable from '../EventStoreReadModelTable/EventStoreReadModelTable'

import Paper from 'material-ui/Paper';

export default class EventStorePage extends React.Component<any, any> {
  render() {
    return (
      <div className='material-demo'>

        <MuiThemeProvider muiTheme={lightMuiTheme}>
          <div>
            <Paper zDepth={4} className='factory-description'>
              <h1>EventStores</h1>
              EventStores provide an audit log and permissions system for your smart contracts to extend.
            </Paper>
            <EventStoreReadModelTable />
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}
