import * as React from 'react';
import * as moment from 'moment'

import Dialog from 'material-ui/Dialog';

import FlatButton from 'material-ui/FlatButton';

import { connect } from 'react-redux';

import {
    //   readAllContractEvents,
    writeFSA
} from '../../../../../actions/transmute'

import SelectSymptoms from '../SelectSymptoms/SelectSymptoms'
import ReportTemperature from '../ReportTemperature/ReportTemperature'

export class RecordEventDialog extends React.Component<any, any> {
    state = {
        dialogTitle: 'non',
        dialogBody: <pre></pre>,
        dialogActions: [],
        open: false,
        symptoms: [],
        temperature: '98.6'
    }
    handleOpen = () => {
        this.setState({ open: true });
    };
    handleClose = () => {
        this.props.dispatch({
            type: 'RECORD_EVENT_DIALOG_UPDATE',
            payload: {}
        })
        this.setState({ open: false });
    };
    componentWillReceiveProps(nextProps: any) {
        // console.log('maybe props...', nextProps)
        if (nextProps.transmute &&
            nextProps.transmute.activeDialog &&
            nextProps.transmute.activeDialog.type
        ) {
            console.log('parse paylaod here... ', nextProps.transmute.activeDialog)

            let title: any, payloadType: string;
            if (nextProps.transmute.activeDialog.type === 'SYMPTOMS') {
                title = 'New Symptoms'
                payloadType = 'SYMPTOMS_REPORTED'
            } else {
                title = 'New Temperature'
                payloadType = 'TEMPERATURE_REPORTED'
            }

            this.setState({
                open: true,
                dialogTitle: title,
                dialogBody: title === 'New Symptoms' ? <SelectSymptoms parent={this} style={{ width: '100%' }} /> : < ReportTemperature parent={this} style={{ width: '100%' }} />,
                dialogActions: [
                    <FlatButton
                        label="Cancel"
                        primary={true}
                        onTouchTap={this.handleClose}
                    />,
                    <FlatButton
                        label="Submit"
                        primary={true}
                        keyboardFocused={true}
                        onTouchTap={() => {
                            let fsa: any = {
                                type: payloadType,
                                payload: {
                                    created: moment().format('LLL'),
                                    data: title === 'New Symptoms' ? this.state.symptoms : this.state.temperature
                                }
                            }
                            this.props.dispatch(writeFSA(this.props.transmute.selectedContract, this.props.transmute.defaultAddress, fsa))
                            this.handleClose()
                        }}
                    />
                ]
            })
        }
    }

    render() {
        return (
            <div>
                <Dialog
                    title={this.state.dialogTitle}
                    actions={this.state.dialogActions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                    {this.state.dialogBody}
                </Dialog>
            </div>
        );
    }
}

export default connect((state: any) => ({
    transmute: state.transmute
}))(RecordEventDialog)
