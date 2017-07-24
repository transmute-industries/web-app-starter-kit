import * as React from 'react';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { MuiThemeProvider, lightBaseTheme } from 'material-ui/styles';

const lightMuiTheme = getMuiTheme(lightBaseTheme);

import './Web3Settings.css';

import Paper from 'material-ui/Paper';

import SettingsForm from './SettingsForm/SettingsForm'

// import { updateWeb3Settings } from '../../../actions/transmute'

export default class Web3Settings extends React.Component<any, any> {
  render() {
    return (
      <div className='web3-settings'>

        <MuiThemeProvider muiTheme={lightMuiTheme}>
          <div>
            <Paper zDepth={4} >
              <div className='factory-description'>
                <h1>Web3</h1>
                Web3 is used to talk to the Ethereum Blockchain.
              </div>
              <div style={{ padding: '16px' }}>
                <SettingsForm  />
              </div>
            </Paper>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

