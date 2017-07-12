
import * as React from 'react';


import './Table.css';
import Paper from 'material-ui/Paper';

import DataTables from 'material-ui-datatables'

export default class Table extends React.Component<any, any> {

    render() {
        return (
            <Paper zDepth={4} className='ti-table' >
               <DataTables />
            </Paper>
        );
    }
}
