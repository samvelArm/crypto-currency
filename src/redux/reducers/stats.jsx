import {
  GET_STATS_REQUEST,
  GET_STATS_SUCCESS,
  GET_STATS_FAILURE
} from "../actions/action-types";

const initialState = {
  data: [],
  isLoading: false,
  errorMessage: ''
}


export default (state = initialState, action) => {
  switch (action.type) {
    case GET_STATS_REQUEST:
      return {
        ...state,
        isLoading: true,
        errorMessage: ''
      }
    case GET_STATS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
        errorMessage: ''
      }
    case GET_STATS_FAILURE:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload,
        data: []
      }
    default:
      return state;
  }
}