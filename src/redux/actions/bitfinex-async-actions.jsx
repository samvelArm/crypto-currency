import { getStats } from "./stats";
import 'whatwg-fetch';

export const getStatsData = (code) => {
  return (dispatch) => {
      dispatch(getStats.request());

      const url = `/bitfinex/book/btcusd`

      fetch(url, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*'
          },
      }).then((data) => {
        data.json().then((jsonData) => {
          dispatch(getStats.success(jsonData))
        }).catch(() => {
          dispatch(getStats.failure('Not Found'))
        })
      }).catch((error) => {
        dispatch(getStats.failure(error.message))
      })
  }
}


