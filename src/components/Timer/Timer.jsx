import React, { Component } from 'react';

import config from '../config/config';
import './Timer.less';
import CircularProgress from 'material-ui/CircularProgress';


export default class Timer extends Component {
    constructor() {
        super();

        this.state = {
            timer: config.timer
        }

    }

    componentDidMount() {
        this.runTimer();
    }

    runTimer = () => {
        setTimeout(() => {
            if (this.state.timer === 0) {
                this.setState({
                    timer: config.timer
                });
                this.props.getStatsData();
                this.runTimer();
            } else {
                this.setState({
                    timer: this.state.timer-1
                });
                this.runTimer();
            }
        }, 1000)

    }

    toHHMMSS(time) {
        var sec_num = parseInt(time, 10); // don't forget the second param
        var hours   = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        var seconds = sec_num - (hours * 3600) - (minutes * 60);

        if (hours   < 10) {hours   = "0"+hours;}
        if (minutes < 10) {minutes = "0"+minutes;}
        if (seconds < 10) {seconds = "0"+seconds;}
        return hours+':'+minutes+':'+seconds;
    }
    render() {
        const time = this.toHHMMSS(this.state.timer);

        return (
            <div className="timer">
                <h2>Next Reload in {time}</h2>
                {this.props.isLoading && <CircularProgress size={28} thickness={3} className="loading" /> }
            </div>
        );
    }
}