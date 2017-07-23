import * as React from 'react';

// import RaisedButton from 'material-ui/RaisedButton';

// import Dialog from 'material-ui/Dialog';
// import FlatButton from 'material-ui/FlatButton'

// import MenuItem from 'material-ui/MenuItem'
import { Card } from 'material-ui/Card'
import IconButton from 'material-ui/IconButton'
import PersonAdd from 'material-ui/svg-icons/social/person-add'
import NavigationRefresh from 'material-ui/svg-icons/navigation/refresh'

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
  // {
  //   key: 'readModelType',
  //   label: 'Model Type',
  //   sortable: true,
  // },
  {
    key: 'contractAddress',
    label: 'Contract',
  },
  {
    key: 'ownerAddress',
    label: 'Owner',
  },
  {
    key: 'created',
    label: 'Created',
  },

]

import DataTables from 'material-ui-datatables'

import * as _ from 'lodash';

import { createEventStore, getFactoryReadModel, readAllContractEvents } from '../../../../actions/transmute'

import * as moment from 'moment'

export class FactoryReadModelTable extends React.Component<any, any> {

  componentWillReceiveProps(nextProps: any) {
    let data: any = []
    if (nextProps.transmute.RBACFactory) {
      // console.log('RBACFactory', nextProps.transmute.RBACFactory.model)

      let keys = Object.keys(nextProps.transmute.RBACFactory.model)
      keys.forEach((key: string) => {
        data.push({
          readModelType: 'Patient Stream',
          contractAddress: key,
          ownerAddress: nextProps.transmute.RBACFactory.model[key].owner,
          created: moment.unix(nextProps.transmute.RBACFactory.model[key].created).format('LLL')
        })
      })
    }
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
    this.handlePreviousPageClick = this.handlePreviousPageClick.bind(this)
    this.handleNextPageClick = this.handleNextPageClick.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
    this.handleRefresh = this.handleRefresh.bind(this)

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
    let selectedModel = this.state.data[selectedRows]
    // console.log('selectedModel: ', selectedModel)
    this.props.dispatch(readAllContractEvents(selectedModel.contractAddress, this.props.transmute.defaultAddress, 0))
   
     this.props.dispatch({
      type: 'DEMO_LOAD',
      payload: {
        contractAddress: selectedModel.contractAddress,
        view: 'eventstore'
      }
    })
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

  handleAdd() {
    console.log('handleAdd', this.props.dispatch)
    this.props.dispatch(createEventStore(this.props.transmute.defaultAddress))
    // this.props.createEventStore({
    //   fromAddress: this.props.mercury.defaultAddress
    // })
  }

  handleRefresh() {
    console.log('handleRefresh')
    this.props.dispatch(getFactoryReadModel(this.props.transmute.defaultAddress))
  }

  render() {
    return (
      <Card >
        <DataTables
          title={'Patients'}
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
              onClick={this.handleAdd}
            >
              <PersonAdd />
            </IconButton>,
            <IconButton
              onClick={this.handleRefresh}
            >
              <NavigationRefresh />
            </IconButton>
          ]}
        />
      </Card>
    )
  }
}

export default connect((state: any) => ({
  transmute: state.transmute
}))(FactoryReadModelTable)
