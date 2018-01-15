import { getCountry } from "./country";
import 'whatwg-fetch';

export const getStatsData = (code) => {
  return (dispatch) => {
      dispatch(getCountry.request());

      const url = `/bitfinex/book/btcusd`

      fetch(url, {
          headers: {
              'Content-Type': 'application/json',
          },
      }).then((data) => {
          console.log('data=', data);
        data.json().then((jsonData) => {
            console.log('jsonData=', jsonData);

          dispatch(getCountry.success(jsonData))

        }).catch((e) => {
            console.log('e=', e);
          dispatch(getCountry.failure('Not Found'))

        })
      }).catch((error) => {
          console.log('error=', error);

        dispatch(getCountry.failure(error.message))

      })
  }
}


