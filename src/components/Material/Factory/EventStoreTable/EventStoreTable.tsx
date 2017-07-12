import * as React from 'react';

// import RaisedButton from 'material-ui/RaisedButton';

// import Dialog from 'material-ui/Dialog';
// import FlatButton from 'material-ui/FlatButton'

// import MenuItem from 'material-ui/MenuItem'
import { Card } from 'material-ui/Card'
import IconButton from 'material-ui/IconButton'
import FileCreateNewFolder from 'material-ui/svg-icons/file/create-new-folder'
import NavigationRefresh from 'material-ui/svg-icons/navigation/refresh'

// https://github.com/hyojin/material-ui-datatables/blob/master/example/src/Main.js


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
    key: 'readModelType',
    label: 'Model Type',
    sortable: true,
  },
  {
    key: 'contractAddress',
    label: 'Contract Address',
  },
  {
    key: 'lastEvent',
    label: 'Last Event',
    sortable: true,
  },
]

// import { connect } from 'react-redux'
// import Mercury from 'store/ethereum/mercury'

import DataTables from 'material-ui-datatables'

import * as _ from 'lodash';

export default class EventStoreTable extends React.Component<any, any> {

  componentWillReceiveProps(nextProps: any) {
    console.log('set state here...', nextProps.mercury.factoryEventStores)
    this.setState({
      data: nextProps.mercury.factoryEventStores
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
    this.handleCreateNewEventStoreClick = this.handleCreateNewEventStoreClick.bind(this)
    this.handleRefreshFactoryEventStoresClick = this.handleRefreshFactoryEventStoresClick.bind(this)

    this.eventStores = []; // this.state.eventStores
    this.state = {
      eventStores: this.eventStores,
      data: this.eventStores,
      page: 1,
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
    let selectedEs = this.state.eventStores[selectedRows]
    console.log('selectedEs.contractAddress: ', selectedEs.contractAddress)
    // browserHistory.push(`/eventstore/${selectedEs.contractAddress}/events`)
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

  handleCreateNewEventStoreClick() {
    console.log('handleCreateNewEventStoreClick')
    this.props.createEventStore({
      fromAddress: this.props.mercury.defaultAddress
    })
  }

  handleRefreshFactoryEventStoresClick() {
    console.log('handleRefreshFactoryEventStoresClick')
    this.props.getEventStoresByCreator({
      fromAddress: this.props.mercury.defaultAddress
    })
  }

  render() {
    return (
      <Card style={{ margin: 12 }}>
  
         <DataTables
          title={'Event Stores'}
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
              onClick={this.handleCreateNewEventStoreClick}
            >
              <FileCreateNewFolder />
            </IconButton>,
            <IconButton
              onClick={this.handleRefreshFactoryEventStoresClick}
            >
              <NavigationRefresh />
            </IconButton>
          ]}
        /> 
      </Card>
    )
  }
}