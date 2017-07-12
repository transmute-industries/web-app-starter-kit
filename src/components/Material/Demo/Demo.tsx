import * as React from 'react';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { MuiThemeProvider, lightBaseTheme } from 'material-ui/styles';

const lightMuiTheme = getMuiTheme(lightBaseTheme);

import './Demo.css';

// import UPortRegister from '../UPortRegister/UPortRegister'
import EventStoreTable from '../Factory/EventStoreTable/EventStoreTable'
// import Table from '../Factory/Table/Table'

export default class Demo extends React.Component<any, any> {
  render() {
    return (
      <div className='material-demo'>
        <MuiThemeProvider muiTheme={lightMuiTheme}>
          <div>
            {/* <UPortRegister /> */}
            {/* <Table /> */}
            <EventStoreTable />
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}
