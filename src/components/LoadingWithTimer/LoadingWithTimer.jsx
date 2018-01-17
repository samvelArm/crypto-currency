import React from 'react';

import { connect } from 'react-redux';
import {getStatsData} from '../../redux/actions/bitfinex-async-actions';
import './LoadingWithTimer.less';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, } from 'material-ui/Table';
import Timer from '../Timer/Timer';

class LoadingWithTimer extends React.Component {
    constructor() {
        super();
    }

    componentWillMount() {
        this.props.getStatsData();
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
                        {bid.count}
                    </TableRowColumn>
                    <TableRowColumn>
                        {bid.amount}
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
                        {ask.count}
                    </TableRowColumn>
                    <TableRowColumn>
                        {ask.amount}
                    </TableRowColumn>
                </TableRow>
            )
        })
        return (
            <div>
                <div>
                    <h1 align="center">Order Book</h1>
                </div>
                <div>
                    <Timer {...this.props}/>
                </div>
                <div className="bids-section">
                    <h3>
                        Bids
                    </h3>
                    <Table>
                        <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                            <TableRow>
                                <TableHeaderColumn>
                                    Price
                                </TableHeaderColumn>
                                <TableHeaderColumn>
                                    Count
                                </TableHeaderColumn>
                                <TableHeaderColumn>
                                    Amount
                                </TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody displayRowCheckbox={false}>
                            {mappedBids}
                        </TableBody>
                    </Table>
                </div>
                <div className="asks-section">
                    <h3>
                        Asks
                    </h3>
                    <Table>
                        <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                            <TableRow>
                                <TableHeaderColumn>
                                    Price
                                </TableHeaderColumn>
                                <TableHeaderColumn>
                                    Count
                                </TableHeaderColumn>
                                <TableHeaderColumn>
                                    Amount
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



export default connect(mapStateToProps, mapDispatchToProps)(LoadingWithTimer);
