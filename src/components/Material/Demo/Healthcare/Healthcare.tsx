import * as React from 'react';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { MuiThemeProvider, lightBaseTheme } from 'material-ui/styles';

const lightMuiTheme = getMuiTheme(lightBaseTheme);

import './Healthcare.css';

// import Paper from 'material-ui/Paper';
import { connect } from 'react-redux'

import HealthcareAppBar from './HealthcareAppBar/HealthcareAppBar'
import PatientTable from './PatientTable/PatientTable'
import PatientEventsTable from './PatientEventsTable/PatientEventsTable'
class HealthcareDemo extends React.Component<any, any> {
  render() {
    return (
      <div className='material-demo' >
        <MuiThemeProvider muiTheme={lightMuiTheme}>
          <div >
            <HealthcareAppBar />
            {
              this.props.transmute.demoView === 'factory' && <PatientTable />
            }
            {
              this.props.transmute.demoView === 'eventstore' && <PatientEventsTable />
            }
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default connect((state: any) => ({
  transmute: state.transmute,
  router: state.router
}))(HealthcareDemo)
