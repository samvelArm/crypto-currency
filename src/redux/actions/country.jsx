import {
  GET_STATS_REQUEST,
  GET_STATS_SUCCESS,
  GET_STATS_FAILURE
} from "./action-types";

export const getCountry = {
  request: () => ({type: GET_STATS_REQUEST}),
  success: (data) => ({type: GET_STATS_SUCCESS, payload: data}),
  failure: (error) => ({type: GET_STATS_FAILURE, payload: error})
}