import * as React from 'react';

import { Card } from 'material-ui/Card'
import IconButton from 'material-ui/IconButton'
import NoteAdd from 'material-ui/svg-icons/action/note-add'
import NavigationRefresh from 'material-ui/svg-icons/navigation/refresh'

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import { connect } from 'react-redux'

// import SelectSymptoms from '../SelectSymptoms/SelectSymptoms'
// import RecordEvent from '../RecordEvent/RecordEvent'

const styles = {
  container: {
    textAlign: 'center',
  },
  component: {
    margin: '60px 20px',
  },
  titleStyle: {
    fontSize: 16
  },
  footerToolbarStyle: {
    padding: '0 100px',
    display: 'none'
  },
  tableStyle: {
    tableLayout: 'auto',
  },
  tableBodyStyle: {
    overflowX: 'auto',
  },
  tableWrapperStyle: {
    padding: 5,
  },
}

const TABLE_COLUMNS_SORT_STYLE = [
  {
    key: 'type',
    label: 'Type',
    sortable: true,
  },
  // {
  //   key: 'txOrigin',
  //   label: 'Creator',
  // },
  {
    key: 'created',
    label: 'Created',
  },

]

import DataTables from 'material-ui-datatables'

import * as _ from 'lodash';

import {
  readAllContractEvents,
  // writeFSA
} from '../../../../../actions/transmute'

import * as moment from 'moment'

import RecordEventDialog from '../RecordEventDialog/RecordEventDialog'


export class EventStoreTable extends React.Component<any, any> {

  componentWillReceiveProps(nextProps: any) {
    let data: any = []


    if (!nextProps.transmute.events) {
      console.log('load events...')
      this.props.dispatch(readAllContractEvents(this.props.transmute.selectedContract, this.props.transmute.defaultAddress, 0))
    }

    if (nextProps.transmute.events) {
      console.log('events', nextProps.transmute.events)

      nextProps.transmute.events.forEach((event: any) => {
        data.push({
          type: event.type,
          // contractAddress: key,
          payload: event.payload,
          txOrigin: event.meta.txOrigin,
          created: moment.unix(event.meta.created).format('LLL')
        })
      })
    }

    // console.log('set state here...', nextProps.mercury.factoryEventStores)
    this.setState({
      data: data
    })
  }

  public eventStores: any;

  constructor(props: any, context: any) {
    super(props, context)
    this.handleSortOrderChange = this.handleSortOrderChange.bind(this)
    this.handleFilterValueChange = this.handleFilterValueChange.bind(this)
    this.handleRowSelection = this.handleRowSelection.bind(this)
    this.handleRecord = this.handleRecord.bind(this)
    this.handleRefresh = this.handleRefresh.bind(this)

    this.eventStores = []; // this.state.eventStores
    this.state = {
      eventStores: this.eventStores,
      data: this.eventStores,
      page: 1,
      open: false,
      symptoms: []
    }
  }

  handleSortOrderChange(key: any, order: any) {
    console.log('key:' + key + ' order: ' + order)
    let data = _.sortBy(this.state.eventStores, [key])
    if (order === 'desc') {
      data.reverse()
    }
    this.setState({
      data: data
    })
  }

  handleFilterValueChange(value: any) {
    console.log('filter value: ' + value)
    let data = this.state.eventStores
    if (value !== '') {
      data = _.filter(data, _.matches({ 'contractAddress': value }))
    }
    this.setState({
      data: data
    })
  }

  handleRowSelection(selectedRows: any) {
    let selectedModel = this.state.data[selectedRows]
    this.setState({
      dialogTitle: 'Event',
      dialogBody: <pre>
        {JSON.stringify(selectedModel, null, 2)}
      </pre>,
      dialogActions: [
        <FlatButton
          label="Cancel"
          primary={true}
          onTouchTap={this.handleClose}
        />
      ]
    })
    this.handleOpen()
  }

  handleRecord(type: string) {
    console.log('handleRecord', this.props.dispatch)
    this.props.dispatch({
      type: 'RECORD_EVENT_DIALOG_UPDATE',
      payload: {
        type: type
      }
    })
  }

  handleRefresh() {
    console.log('handleRefresh')
    this.props.dispatch(readAllContractEvents(this.props.transmute.selectedContract, this.props.transmute.defaultAddress, 0))
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  render() {

    return (
      <Card>
        <DataTables
          title={'Events'}
          titleStyle={styles.titleStyle}
          height={'auto'}
          selectable={true}
          showRowHover={true}
          columns={TABLE_COLUMNS_SORT_STYLE}
          data={this.state.data}
          showCheckboxes={false}
          showHeaderToolbar={true}
          footerToolbarStyle={styles.footerToolbarStyle}
          tableBodyStyle={styles.tableBodyStyle}
          tableStyle={styles.tableStyle}
          tableWrapperStyle={styles.tableWrapperStyle}
          count={100}
          onRowSelection={this.handleRowSelection}
          onFilterValueChange={this.handleFilterValueChange}
          onSortOrderChange={this.handleSortOrderChange}
          toolbarIconRight={[
            <IconButton
              onClick={() => {
                let type = Math.random() > .5 ? 'SYMPTOMS' : 'TEMPERATURE';
                this.handleRecord(type)
              }}
            >
              <NoteAdd />
            </IconButton>,
            <IconButton
              onClick={this.handleRefresh}
            >
              <NavigationRefresh />
            </IconButton>
          ]}
        />
        <Dialog
          title={this.state.dialogTitle}
          actions={this.state.dialogActions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          {this.state.dialogBody}
        </Dialog>
        <RecordEventDialog />
      </Card>
    )
  }
}

export default connect((state: any) => ({
  transmute: state.transmute
}))(EventStoreTable)
