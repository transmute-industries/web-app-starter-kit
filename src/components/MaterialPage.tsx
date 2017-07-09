import * as React from 'react';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { MuiThemeProvider, lightBaseTheme } from 'material-ui/styles';

const lightMuiTheme = getMuiTheme(lightBaseTheme);

import RaisedButton from 'material-ui/RaisedButton';

export default class MaterialPage extends React.Component<any, any> {
  render() {
    return (
      <div>
        <MuiThemeProvider muiTheme={lightMuiTheme}>
          <RaisedButton label="Default" />
        </MuiThemeProvider>
      </div>
    );
  }
}
