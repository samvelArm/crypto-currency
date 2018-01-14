import {
  GET_COUNTRY_REQUEST,
  GET_COUNTRY_SUCCESS,
  GET_COUNTRY_FAILURE
} from "./action-types";

export const getCountry = {
  request: () => ({type: GET_COUNTRY_REQUEST}),
  success: (data) => ({type: GET_COUNTRY_SUCCESS, payload: data}),
  failure: (error) => ({type: GET_COUNTRY_FAILURE, payload: error})
}