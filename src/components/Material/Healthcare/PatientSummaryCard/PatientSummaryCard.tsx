import * as React from 'react';

import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card'

import RaisedButton from 'material-ui/RaisedButton';

import { connect } from 'react-redux'

import TransmuteFramework from '../../../../../src/transmute'

let EventStoreContract = TransmuteFramework.EventStoreContract

let { getCachedReadModel } = TransmuteFramework.ReadModel

import {
    reducer as patientSummaryReducer,
    readModel as patientSummaryReadModel
} from './PatientSummaryReducer'

export class PatientSummaryCard extends React.Component<any, any> {

    render() {
        return (
            <Card>
                <CardTitle>
                    Summary
                </CardTitle>
                <CardText>
                    <div>Last Temperature: 98.6</div>
                    <div>Last Symptoms: Dizzy</div>
                    <div>Diagnosis: Flu</div>
                </CardText>
                <CardActions>
                    <RaisedButton secondary label="Refresh" onTouchTap={async () => {
                        let { selectedContract, defaultAddress } = this.props.transmute;
                        let eventStore = await EventStoreContract.at(selectedContract)
                        let updatedReadModel = await getCachedReadModel(eventStore, defaultAddress, patientSummaryReadModel, patientSummaryReducer)
                        console.log('refresh: ', updatedReadModel)
                    }} />
                </CardActions>
            </Card>
        );
    }

}

export default connect((state: any) => ({
    transmute: state.transmute
}))(PatientSummaryCard)
