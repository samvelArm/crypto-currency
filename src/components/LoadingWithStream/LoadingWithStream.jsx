import React from 'react';

import { connect } from 'react-redux';
import {getStreamData} from '../../redux/actions/bitfinex-async-actions';
import './LoadingWithStream.less';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, } from 'material-ui/Table';

class LoadingWithStream extends React.Component {
    constructor() {
        super();
    }

    componentWillMount() {
        this.props.getStreamData();
    }

    render() {
        const mappedBids = this.props.data.bids.map((bid) => {
            return(
                <TableRow key={bid.index}>
                    <TableRowColumn>
                        {bid.amount}
                    </TableRowColumn>
                    <TableRowColumn>
                        {bid.price}
                    </TableRowColumn>
                    <TableRowColumn>
                        {bid.timestamp}
                    </TableRowColumn>
                </TableRow>
            )
        })
        const mappedAsks = this.props.data.asks.map((ask) => {
            return(
                <TableRow key={ask.index}>
                    <TableRowColumn>
                        {ask.amount}
                    </TableRowColumn>
                    <TableRowColumn>
                        {ask.price}
                    </TableRowColumn>
                    <TableRowColumn>
                        {ask.timestamp}
                    </TableRowColumn>
                </TableRow>
            )
        })
        return (
            <div>
                <div>
                    <h1 className="stream-header">Streaming</h1>
                </div>
                <div className="bids-section">
                    <h1>
                        Bids
                    </h1>
                    <Table>
                        <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                            <TableRow>
                                <TableHeaderColumn>
                                    Amount
                                </TableHeaderColumn>
                                <TableHeaderColumn>
                                    Price
                                </TableHeaderColumn>
                                <TableHeaderColumn>
                                    timestamp
                                </TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody displayRowCheckbox={false}>
                            {mappedBids}
                        </TableBody>
                    </Table>
                </div>
                <div className="asks-section">
                    <h1>
                        Asks
                    </h1>
                    <Table>
                        <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                            <TableRow>
                                <TableHeaderColumn>
                                    Amount
                                </TableHeaderColumn>
                                <TableHeaderColumn>
                                    Price
                                </TableHeaderColumn>
                                <TableHeaderColumn>
                                    timestamp
                                </TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody displayRowCheckbox={false}>
                            {mappedAsks}
                        </TableBody>
                    </Table>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isStarted: state.streamStats.isStarted,
        data: state.streamStats.streamData
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getStreamData: () => dispatch(getStreamData())
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(LoadingWithStream);
