import * as React from 'react';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { MuiThemeProvider, lightBaseTheme } from 'material-ui/styles';

const lightMuiTheme = getMuiTheme(lightBaseTheme);

import './Healthcare.css';

// import Paper from 'material-ui/Paper';
import { connect } from 'react-redux'

import HealthcareAppBar from './HealthcareAppBar/HealthcareAppBar'
import SelectEventStoreCard from './SelectEventStoreCard/SelectEventStoreCard'
import PatientEventsTable from './PatientEventsTable/PatientEventsTable'
import PatientSummaryCard from './PatientSummaryCard/PatientSummaryCard'

import { Grid, Row, Col } from 'react-flexbox-grid'

class HealthcareDemo extends React.Component<any, any> {
  render() {
    return (
      <div className='material-demo' >
        <MuiThemeProvider muiTheme={lightMuiTheme}>
          <div >
            <HealthcareAppBar />
            <Grid fluid style={{ marginTop: '32px' }}>
              <Row >
                <Col xs={12} sm={6}>
                  <SelectEventStoreCard />
                  <br />
                  <PatientSummaryCard />
                </Col>
                <Col xs={12} sm={6}>
                  <PatientEventsTable />
                </Col>
              </Row>
            </Grid>
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
