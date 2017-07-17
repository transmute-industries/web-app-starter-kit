import * as React from 'react';

// import RaisedButton from 'material-ui/RaisedButton';

// import Dialog from 'material-ui/Dialog';
// import FlatButton from 'material-ui/FlatButton'

// import MenuItem from 'material-ui/MenuItem'
import { Card } from 'material-ui/Card'
import IconButton from 'material-ui/IconButton'
import FileCreateNewFolder from 'material-ui/svg-icons/file/create-new-folder'
import NavigationRefresh from 'material-ui/svg-icons/navigation/refresh'

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

// https://github.com/hyojin/material-ui-datatables/blob/master/example/src/Main.js

import { connect } from 'react-redux'

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
  {
    key: 'txOrigin',
    label: 'Creator',
  },
  // {
  //   key: 'payload',
  //   label: 'Payload',
  // },
  {
    key: 'created',
    label: 'Created',
  },

]

// import { connect } from 'react-redux'
// import Mercury from 'store/ethereum/mercury'

import DataTables from 'material-ui-datatables'

import * as _ from 'lodash';

import { readAllContractEvents, writeFSA } from '../../../actions/transmute'

import * as moment from 'moment'

// import { push } from 'react-router-redux'

// const isEventStoreRoute = (path: string) => {
//   return path.indexOf('/web-app-starter-kit/eventstore/') === 0
// }

const getContractAddressFromPath = (path: string) => {
  return path.split('/web-app-starter-kit/eventstore/')[1]
}

export class EventStoreTable extends React.Component<any, any> {

  componentWillReceiveProps(nextProps: any) {
    let data: any = []
    let path = nextProps.router.location.pathname
    // console.log('nextProps', isEventStoreRoute(path))
    let contractAddress = getContractAddressFromPath(path)
    // console.log('contractAddress', contractAddress)
    if (!nextProps.transmute.events) {
      console.log('load events...')
      this.props.dispatch(readAllContractEvents(contractAddress, this.props.transmute.defaultAddress, 0))
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
      data: data,
      contractAddress: contractAddress
    })
  }

  public eventStores: any;

  constructor(props: any, context: any) {
    super(props, context)
    this.handleSortOrderChange = this.handleSortOrderChange.bind(this)
    this.handleFilterValueChange = this.handleFilterValueChange.bind(this)
    this.handleRowSelection = this.handleRowSelection.bind(this)
    this.handlePreviousPageClick = this.handlePreviousPageClick.bind(this)
    this.handleNextPageClick = this.handleNextPageClick.bind(this)
    this.handleCreate = this.handleCreate.bind(this)
    this.handleRefresh = this.handleRefresh.bind(this)

    this.eventStores = []; // this.state.eventStores
    this.state = {
      eventStores: this.eventStores,
      data: this.eventStores,
      page: 1,
      open: false,
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

  handleCellClick(rowIndex: any, columnIndex: any, row: any, column: any) {
    console.log('rowIndex: ' + rowIndex + ' columnIndex: ' + columnIndex)
  }

  handleCellDoubleClick(rowIndex: any, columnIndex: any, row: any, column: any) {
    console.log('rowIndex: ' + rowIndex + ' columnIndex: ' + columnIndex)
  }

  handleRowSelection(selectedRows: any) {
    // console.log('selectedRows: ' + selectedRows)
    let selectedModel = this.state.data[selectedRows]
    console.log('selectedModel: ', selectedModel)
    this.setState({
      selectedPayload: selectedModel.payload
    })
    this.handleOpen()
    // browserHistory.push()
    // let path = `/web-app-starter-kit/eventstore/${selectedModel.contractAddress}`
    // this.props.dispatch(push(path))
  }

  handlePreviousPageClick() {
    console.log('handlePreviousPageClick')
    // this.setState({
    //   data: this.state.eventStores,
    //   page: 1,
    // })
  }

  handleNextPageClick() {
    console.log('handleNextPageClick')
    // this.setState({
    //   data: this.state.eventStores,
    //   page: 2,
    // })
  }

  handleCreate() {
    console.log('handleCreate', this.props.dispatch)
    this.props.dispatch(writeFSA(this.state.contractAddress, this.props.transmute.defaultAddress, {
      type: 'RANDOM_MOMENT_CREATED',
      payload: {
        created: moment().format('LLL'),
        data: Math.random()
      }
    }))
    // this.props.createEventStore({
    //   fromAddress: this.props.mercury.defaultAddress
    // })
  }

  handleRefresh() {
    console.log('handleRefresh')
    this.props.dispatch(readAllContractEvents(this.state.contractAddress, this.props.transmute.defaultAddress, 0))
    // this.props.dispatch(getFactoryReadModel(this.props.transmute.defaultAddress))
    // this.props.getEventStoresByCreator({
    //   fromAddress: this.props.mercury.defaultAddress
    // })
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      // <FlatButton
      //   label="Submit"
      //   primary={true}
      //   keyboardFocused={true}
      //   onTouchTap={this.handleClose}
      // />,
    ];

    return (
      <Card style={{ margin: 12 }}>
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
              onClick={this.handleCreate}
            >
              <FileCreateNewFolder />
            </IconButton>,
            <IconButton
              onClick={this.handleRefresh}
            >
              <NavigationRefresh />
            </IconButton>
          ]}
        />
        <Dialog
          title="Payload"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <pre>
            {JSON.stringify(this.state.selectedPayload, null, 2)}
          </pre>
        </Dialog>
      </Card>
    )
  }
}

export default connect((state: any) => ({
  transmute: state.transmute,
  router: state.router
}))(EventStoreTable)
