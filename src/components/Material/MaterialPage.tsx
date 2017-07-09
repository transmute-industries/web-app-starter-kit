import * as React from 'react';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { MuiThemeProvider, lightBaseTheme } from 'material-ui/styles';

const lightMuiTheme = getMuiTheme(lightBaseTheme);


import './MaterialPage.css';

import UPortRegister  from './UPortRegister/UPortRegister'

export default class MaterialPage extends React.Component<any, any> {
  render() {
    return (
      <div className='material-demo'>
        <MuiThemeProvider muiTheme={lightMuiTheme}>
          <UPortRegister />
        </MuiThemeProvider>
      </div>
    );
  }
}
