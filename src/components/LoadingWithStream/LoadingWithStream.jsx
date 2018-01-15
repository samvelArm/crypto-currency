import React from 'react';

import { connect } from 'react-redux';
import {getStatsData} from '../../redux/actions/bitfinex-async-actions';
import './LoadingWithStream.less';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, } from 'material-ui/Table';

class LoadingWithStream extends React.Component {
    constructor() {
        super();
    }

    componentWillMount() {
        this.props.getStatsData();
    }

    render() {
        const mappedBids = this.props.data.bids.map((bid, index) => {
            return(
                <TableRow key={index}>
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
        const mappedAsks = this.props.data.asks.map((ask, index) => {
            return(
                <TableRow key={index}>
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
        isLoading: state.stats.isLoading,
        errorMessage: state.stats.errorMessage,
        data: state.stats.data
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getStatsData: (code) => dispatch(getStatsData(code))
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(LoadingWithStream);
