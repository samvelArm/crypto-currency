import React from 'react';

import { connect } from 'react-redux';

import './Main.less';
import Loader from './Loader/index';
import ErrorMessage from './ErrorMessage/index';
import Content from './Content/index';
import {getCountryData} from "../redux/actions/country-async-actions";

class Main extends React.Component {
  constructor() {
    super();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.getData(this.inputRef.value);
  }

  setInputRef = (ref) => {
    this.inputRef = ref;
  }

  render() {
    const { isLoading, data } = this.props;
    return (
      <div className="country-search">
        <h1>Search Your Country by FIFA code.</h1>
        <div className="search-box">
          <form onSubmit={this.handleSubmit}>
            <div className="input-box">
              <input type="text" placeholder={'Enter FIFA Code Here'} ref={this.setInputRef}/>
              {isLoading && <Loader/>}
            </div>
            <button>Search</button>
          </form>
          {this.props.errorMessage !== '' && <ErrorMessage errorMessage={this.props.errorMessage}/>}
          <Content data={data}/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.country.isLoading,
    errorMessage: state.country.errorMessage,
    data: state.country.data
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getData: (code) => dispatch(getCountryData(code))
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(Main);
