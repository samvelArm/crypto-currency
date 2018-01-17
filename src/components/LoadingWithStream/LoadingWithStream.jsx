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
        const mappedBids = this.props.data.bids.sort((a, b) => {
            if (a.price > b.price) {
                return 1;
            }
            if (a.price < b.price) {
                return -1;
            }
            return 0;
        }).map((bid) => {
            return(
                <TableRow key={bid.price}>
                    <TableRowColumn>
                        {bid.price}
                    </TableRowColumn>
                    <TableRowColumn>
                        {bid.amount}
                    </TableRowColumn>
                    <TableRowColumn>
                        {bid.count}
                    </TableRowColumn>
                </TableRow>
            )
        })
        const mappedAsks = this.props.data.asks.sort((a, b) => {
            if (a.price > b.price) {
                return 1;
            }
            if (a.price < b.price) {
                return -1;
            }
            return 0;
        }).map((ask) => {
            return(
                <TableRow key={ask.price}>
                    <TableRowColumn>
                        {ask.price}
                    </TableRowColumn>
                    <TableRowColumn>
                        {ask.amount}
                    </TableRowColumn>
                    <TableRowColumn>
                        {ask.count}
                    </TableRowColumn>
                </TableRow>
            )
        })
        return (
            <div>
                <div>
                    <h1 className="stream-header">Streaming {this.props.isStarted ? this.props.dataNumber : ''}</h1>
                </div>
                <div className="bids-section">
                    <h1>
                        Bids
                    </h1>
                    <Table>
                        <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                            <TableRow>
                                <TableHeaderColumn>
                                    Price
                                </TableHeaderColumn>
                                <TableHeaderColumn>
                                    Amount
                                </TableHeaderColumn>
                                <TableHeaderColumn>
                                    Count
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
                                    Price
                                </TableHeaderColumn>
                                <TableHeaderColumn>
                                    Amount
                                </TableHeaderColumn>
                                <TableHeaderColumn>
                                    Count
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
        data: state.streamStats.streamData,
        dataNumber: state.streamStats.dataNumber
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getStreamData: () => dispatch(getStreamData())
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(LoadingWithStream);
