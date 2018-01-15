import React from 'react';

import { connect } from 'react-redux';

import './Main.less';
import {getStatsData} from '../redux/actions/country-async-actions';

class Main extends React.Component {
  constructor() {
    super();
  }

  componentWillMount() {
      this.props.getStatsData();
  }

  render() {
    console.log('this.props=', this.props);
    return (
      <div>
        myCriptoCurrency
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



export default connect(mapStateToProps, mapDispatchToProps)(Main);
