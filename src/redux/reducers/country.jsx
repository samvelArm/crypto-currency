import {
  GET_COUNTRY_REQUEST,
  GET_COUNTRY_FAILURE,
  GET_COUNTRY_SUCCESS
} from "../actions/action-types";

const initialState = {
  data: [],
  isLoading: false,
  errorMessage: ''
}


export default (state = initialState, action) => {
  switch (action.type) {
    case GET_COUNTRY_REQUEST:
      return {
        ...state,
        isLoading: true,
        errorMessage: ''
      }
    case GET_COUNTRY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
        errorMessage: ''
      }
    case GET_COUNTRY_FAILURE:
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